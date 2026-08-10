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

const GEMINI_MODEL = 'gemini-2.0-flash'

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
  return messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Метод не поддерживается.' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Aster временно недоступен.' })
  }

  const rawMessages = req.body?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return res.status(400).json({ error: 'Добавьте сообщение для Aster.' })
  }

  const messages = rawMessages.filter(isChatMessage).slice(-20)
  if (messages.length === 0) {
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
        contents: toGeminiContents(messages),
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
