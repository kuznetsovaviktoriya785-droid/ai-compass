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

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false
  const message = value as ChatMessage
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Метод не поддерживается.' })
  }

  const apiKey = process.env.OPENAI_API_KEY
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
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })

    const data = (await openAiResponse.json()) as {
      error?: { message?: string }
      choices?: Array<{ message?: { content?: string } }>
    }

    if (!openAiResponse.ok) {
      console.error('OpenAI error:', data?.error?.message ?? openAiResponse.status)
      return res.status(502).json({ error: 'Не удалось получить ответ от Aster.' })
    }

    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return res.status(502).json({ error: 'Aster не вернул ответ.' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Aster chat handler failed:', error)
    return res.status(500).json({ error: 'Не удалось связаться с Aster.' })
  }
}
