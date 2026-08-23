import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  role: ChatRole
  content: string
}

const SYSTEM_PROMPT = [
  'Ты — Aster, персональный AI-навигатор проекта AI Compass.',
  'Ты спокойный, уверенный, дружелюбный и понятный проводник в мире искусственного интеллекта.',
  'Помогай пользователю идти по логике: цель → направление → маршрут → инструменты → действие → результат.',
  'Давай конкретный следующий шаг, без перегруженных инструкций и без высокомерия.',
  'Отвечай по-русски, кратко и ясно.',
].join(' ')

const GEMINI_MODEL = 'gemini-3-flash-preview'
const CONTEXT_LIMIT = 6
const MAX_MESSAGE_LENGTH = 2_000
const MAX_CONTEXT_LENGTH = 8_000
const MAX_REQUEST_BODY_BYTES = 48 * 1024
const GEMINI_TIMEOUT_MS = 30_000

interface UsageMetadata {
  promptTokenCount?: number
  candidatesTokenCount?: number
  totalTokenCount?: number
  cachedContentTokenCount?: number
}

function parseRetryAfter(value: string | null) {
  if (!value) return undefined

  const seconds = Number(value)
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.min(Math.max(Math.ceil(seconds), 1), 3_600)
  }

  const retryAt = Date.parse(value)
  if (!Number.isFinite(retryAt)) return undefined

  const delaySeconds = Math.ceil((retryAt - Date.now()) / 1_000)
  if (delaySeconds <= 0) return undefined
  return Math.min(delaySeconds, 3_600)
}

function parseContentLength(value: string | string[] | undefined) {
  if (typeof value !== 'string') return undefined

  const normalized = value.trim()
  if (!/^\d+$/.test(normalized)) return undefined

  const bytes = Number(normalized)
  return Number.isSafeInteger(bytes) ? bytes : undefined
}

function loadLocalGeminiKey() {
  if (process.env.GEMINI_API_KEY) return

  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file)
    if (!existsSync(path)) continue

    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const separator = trimmed.indexOf('=')
      if (separator === -1) continue

      const name = trimmed.slice(0, separator).trim()
      if (name !== 'GEMINI_API_KEY') continue

      let value = trimmed.slice(separator + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      if (value) {
        process.env.GEMINI_API_KEY = value
        return
      }
    }
  }
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false
  const message = value as ChatMessage
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  )
}

function toGeminiContents(messages: ChatMessage[]) {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []

  for (const message of messages) {
    const role = message.role === 'assistant' ? 'model' : 'user'
    const last = contents[contents.length - 1]
    if (last && last.role === role) {
      last.parts[0].text += `\n${message.content}`
      continue
    }
    contents.push({ role, parts: [{ text: message.content }] })
  }

  while (contents.length > 0 && contents[0].role !== 'user') {
    contents.shift()
  }

  return contents
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Метод не поддерживается.' })
  }

  const requestId = randomUUID()
  const startedAt = Date.now()
  res.setHeader('X-Request-ID', requestId)

  const logRequest = (status: number, usageMetadata?: UsageMetadata) => {
    console.info('Aster Gemini request', {
      requestId,
      model: GEMINI_MODEL,
      status,
      latencyMs: Date.now() - startedAt,
      usageMetadata,
    })
  }

  loadLocalGeminiKey()
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Aster временно недоступен.' })
  }

  const contentLength = parseContentLength(req.headers['content-length'])
  if (contentLength !== undefined && contentLength > MAX_REQUEST_BODY_BYTES) {
    return res.status(413).json({ error: 'Запрос слишком большой.', code: 'REQUEST_TOO_LARGE' })
  }

  if (contentLength === undefined) {
    let serializedBodyBytes = 0
    try {
      serializedBodyBytes = Buffer.byteLength(JSON.stringify(req.body ?? null), 'utf8')
    } catch {
      return res.status(400).json({ error: 'Некорректное тело запроса.', code: 'INVALID_BODY' })
    }

    if (serializedBodyBytes > MAX_REQUEST_BODY_BYTES) {
      return res.status(413).json({ error: 'Запрос слишком большой.', code: 'REQUEST_TOO_LARGE' })
    }
  }

  const rawMessages = req.body?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  const validMessages = rawMessages.filter(isChatMessage)
  const messages = validMessages.slice(-CONTEXT_LIMIT)
  if (messages.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  if (
    messages.some(
      (message) => message.role === 'user' && message.content.length > MAX_MESSAGE_LENGTH,
    )
  ) {
    return res.status(400).json({
      error: 'Сообщение слишком длинное.',
      code: 'MESSAGE_TOO_LONG',
    })
  }

  const contextLength = messages.reduce((total, message) => total + message.content.length, 0)
  if (contextLength > MAX_CONTEXT_LENGTH) {
    return res.status(400).json({
      error: 'Контекст разговора слишком большой.',
      code: 'CONTEXT_TOO_LARGE',
    })
  }

  const contents = toGeminiContents(messages)
  if (contents.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  const controller = new AbortController()
  let clientDisconnected = req.aborted || res.destroyed
  let timedOut = false

  const onClientDisconnect = () => {
    if (res.writableEnded) return
    clientDisconnected = true
    controller.abort()
  }

  req.once('aborted', onClientDisconnect)
  res.once('close', onClientDisconnect)

  const timeoutId = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, GEMINI_TIMEOUT_MS)

  const canRespond = () => !clientDisconnected && !res.destroyed && !res.writableEnded

  try {
    if (clientDisconnected) return

    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${GEMINI_MODEL}:generateContent`

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    })

    if (geminiResponse.status === 429) {
      const retryAfter = parseRetryAfter(geminiResponse.headers.get('retry-after'))
      logRequest(429)
      if (!canRespond()) return
      if (retryAfter !== undefined) {
        res.setHeader('Retry-After', String(retryAfter))
      }
      return res.status(429).json({
        error: 'Слишком много запросов. Попробуйте позже.',
        code: 'RATE_LIMITED',
        ...(retryAfter !== undefined ? { retryAfter } : {}),
      })
    }

    if (geminiResponse.status === 504) {
      logRequest(504)
      if (!canRespond()) return
      return res.status(504).json({
        error: 'Aster не успел ответить. Попробуйте ещё раз.',
        code: 'TIMEOUT',
      })
    }

    if (!geminiResponse.ok) {
      logRequest(geminiResponse.status)
      if (!canRespond()) return
      return res.status(502).json({ error: 'Не удалось получить ответ от Aster.' })
    }

    let data: {
      usageMetadata?: UsageMetadata
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> }
      }>
    } | null = null

    try {
      data = (await geminiResponse.json()) as NonNullable<typeof data>
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error
      }
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('')
      .trim()

    if (!reply) {
      logRequest(502, data?.usageMetadata)
      if (!canRespond()) return
      return res.status(502).json({ error: 'Aster не вернул ответ.' })
    }

    logRequest(200, data?.usageMetadata)
    if (!canRespond()) return
    return res.status(200).json({ reply })
  } catch (error) {
    if (clientDisconnected) return

    if (timedOut && error instanceof Error && error.name === 'AbortError') {
      logRequest(504)
      if (!canRespond()) return
      return res.status(504).json({
        error: 'Aster не успел ответить. Попробуйте ещё раз.',
        code: 'TIMEOUT',
      })
    }

    console.error('Aster chat handler failed', {
      requestId,
      model: GEMINI_MODEL,
      status: 500,
      latencyMs: Date.now() - startedAt,
    })
    if (!canRespond()) return
    return res.status(500).json({ error: 'Не удалось связаться с Aster.' })
  } finally {
    clearTimeout(timeoutId)
    req.off('aborted', onClientDisconnect)
    res.off('close', onClientDisconnect)
  }
}
