import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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

  loadLocalGeminiKey()
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Aster временно недоступен.' })
  }

  const rawMessages = req.body?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  const messages = rawMessages.filter(isChatMessage).slice(-CONTEXT_LIMIT)
  if (messages.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  const contents = toGeminiContents(messages)
  if (contents.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  try {
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${GEMINI_MODEL}:generateContent`

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
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
        },
      }),
    })

    const data = (await geminiResponse.json()) as {
      error?: { message?: string }
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> }
      }>
    }

    if (!geminiResponse.ok) {
      console.error('Gemini error:', data?.error?.message ?? geminiResponse.status)
      return res.status(502).json({ error: 'Не удалось получить ответ от Aster.' })
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('')
      .trim()

    if (!reply) {
      return res.status(502).json({ error: 'Aster не вернул ответ.' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Aster chat handler failed:', error)
    return res.status(500).json({ error: 'Не удалось связаться с Aster.' })
  }
}
