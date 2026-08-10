export type AsterChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type AsterChatResponse = {
  reply?: string
  error?: string
}

export async function sendAsterChat(
  messages: AsterChatMessage[],
): Promise<string> {
  const response = await fetch('/api/aster/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
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
