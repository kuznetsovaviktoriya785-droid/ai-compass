export type AsterChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type AsterChatResponse = {
  reply?: string
  error?: string
  code?: string
  retryAfter?: number
}

const CONTEXT_LIMIT = 6
export const ASTER_MAX_MESSAGE_LENGTH = 2_000
const ASTER_MAX_CONTEXT_LENGTH = 8_000

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

export class AsterChatError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly status?: number,
    readonly retryAfter?: number,
  ) {
    super(message)
    this.name = 'AsterChatError'
  }
}

export async function sendAsterChat(
  messages: AsterChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const history = messages
    .filter(
      (message) =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-CONTEXT_LIMIT)

  if (
    history.some(
      (message) => message.role === 'user' && message.content.length > ASTER_MAX_MESSAGE_LENGTH,
    )
  ) {
    throw new AsterChatError('Сообщение слишком длинное.', 'MESSAGE_TOO_LONG', 400)
  }

  const contextLength = history.reduce((total, message) => total + message.content.length, 0)
  if (contextLength > ASTER_MAX_CONTEXT_LENGTH) {
    throw new AsterChatError('Контекст разговора слишком большой.', 'CONTEXT_TOO_LARGE', 400)
  }

  const response = await fetch('/api/aster/chat', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: history }),
  })

  if (response.status === 429) {
    const retryAfter = parseRetryAfter(response.headers.get('retry-after'))
    const message = retryAfter
      ? `Слишком много запросов. Попробуйте снова через ${retryAfter} сек.`
      : 'Слишком много запросов. Попробуйте немного позже.'
    throw new AsterChatError(message, 'RATE_LIMITED', 429, retryAfter)
  }

  if (response.status === 504) {
    throw new AsterChatError(
      'Aster не успел ответить. Попробуйте ещё раз.',
      'TIMEOUT',
      504,
    )
  }

  let data: AsterChatResponse = {}
  try {
    data = (await response.json()) as AsterChatResponse
  } catch {
    if (response.ok) {
      throw new Error('Не удалось прочитать ответ Aster.')
    }
  }

  if (!response.ok || !data.reply) {
    if (response.status === 429 || data.code === 'RATE_LIMITED') {
      const retryAfter =
        typeof data.retryAfter === 'number' && Number.isFinite(data.retryAfter)
          ? Math.min(Math.max(Math.ceil(data.retryAfter), 1), 3_600)
          : undefined
      const message = retryAfter
        ? `Слишком много запросов. Попробуйте снова через ${retryAfter} сек.`
        : 'Слишком много запросов. Попробуйте немного позже.'
      throw new AsterChatError(message, 'RATE_LIMITED', 429, retryAfter)
    }

    if (response.status === 504 || data.code === 'TIMEOUT') {
      throw new AsterChatError(
        'Aster не успел ответить. Попробуйте ещё раз.',
        'TIMEOUT',
        504,
      )
    }

    throw new AsterChatError(
      data.error || 'Не удалось получить ответ от Aster.',
      data.code,
      response.status,
    )
  }

  return data.reply
}
