export type AsterChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type AsterChatResponse = {
  reply?: string
  error?: string
}

const CONTEXT_LIMIT = 12

export async function sendAsterChat(
  messages: AsterChatMessage[],
): Promise<string> {
  const history = messages
    .filter(
      (message) =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-CONTEXT_LIMIT)

  const response = await fetch('/api/aster/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: history }),
  })

  let data: AsterChatResponse = {}
  try {
    data = (await response.json()) as AsterChatResponse
  } catch {
    throw new Error('Не удалось прочитать ответ Aster.')
  }

  if (!response.ok || !data.reply) {
    throw new Error(data.error || 'Не удалось получить ответ от Aster.')
  }

  return data.reply
}
