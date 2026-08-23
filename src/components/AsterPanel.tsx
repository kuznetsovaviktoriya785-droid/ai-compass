import { FormEvent, useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import {
  ASTER_MAX_MESSAGE_LENGTH,
  sendAsterChat,
  type AsterChatMessage,
} from '../lib/asterChat'

const QUICK_ACTIONS = [
  'С чего начать?',
  'Подобрать AI-инструмент',
  'Построить мой маршрут',
  'Задать вопрос Aster',
] as const

interface AsterPanelProps {
  open: boolean
  onClose: () => void
}

export default function AsterPanel({ open, onClose }: AsterPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<AsterChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const requestLockRef = useRef(false)
  const activeRequestControllerRef = useRef<AbortController | null>(null)
  const hasUserMessage = messages.some((message) => message.role === 'user')

  useEffect(() => {
    if (!open) setExpanded(false)
  }, [open])

  useEffect(() => {
    const node = threadRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, loading, error])

  useEffect(
    () => () => {
      activeRequestControllerRef.current?.abort()
      activeRequestControllerRef.current = null
      requestLockRef.current = false
    },
    [],
  )

  const resetConversation = () => {
    if (requestLockRef.current) return
    setDraft('')
    setMessages([])
    setError(null)
    setLoading(false)
  }

  const sendMessage = async (text: string) => {
    const content = text.trim()
    if (!content || requestLockRef.current) return

    requestLockRef.current = true
    const controller = new AbortController()
    activeRequestControllerRef.current = controller

    const nextMessages: AsterChatMessage[] = [
      ...messages,
      { role: 'user', content },
    ]

    setDraft('')
    setError(null)
    setMessages(nextMessages)
    setLoading(true)

    try {
      const reply = await sendAsterChat(nextMessages, controller.signal)
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Не удалось получить ответ от Aster.'
      setError(message)
    } finally {
      requestLockRef.current = false
      if (activeRequestControllerRef.current === controller) {
        activeRequestControllerRef.current = null
      }
      setLoading(false)
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(draft)
  }

  return (
    <div
      id="aster-assistant-panel"
      className={[
        'aster-panel',
        open ? 'aster-panel--open' : '',
        expanded ? 'aster-panel--expanded' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-modal="false"
      aria-label="Aster · AI-навигатор"
      aria-hidden={!open}
    >
      <header className="aster-panel-header">
        <div className="aster-panel-heading">
          <p className="aster-panel-title">Aster · AI-навигатор</p>
          <p className="aster-panel-status">
            <span className="aster-panel-status-dot" aria-hidden="true" />
            на связи
          </p>
        </div>

        <div className="aster-panel-toolbar">
          <button
            type="button"
            className="aster-panel-icon-btn"
            aria-label={expanded ? 'Свернуть' : 'Развернуть'}
            aria-pressed={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? (
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                <path
                  d="M5 3 H3 V5 M11 3 H13 V5 M5 13 H3 V11 M11 13 H13 V11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                <path
                  d="M3 6 V3 H6 M10 3 H13 V6 M13 10 V13 H10 M6 13 H3 V10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="aster-panel-icon-btn"
            aria-label="Новый разговор"
            disabled={loading}
            onClick={resetConversation}
          >
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path
                d="M12.4 8 A4.4 4.4 0 1 1 11.2 4.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M11.1 2.6 L11.2 4.5 L13.1 4.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="aster-panel-icon-btn"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path
                d="M4 4 L12 12 M12 4 L4 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="aster-panel-body" ref={threadRef}>
        <p className="aster-panel-welcome">
          Я Aster. Помогу увидеть, куда двигаться дальше.
        </p>

        {hasUserMessage ? (
          <div className="aster-panel-thread" aria-live="polite">
            {messages.map((message, index) =>
              message.role === 'assistant' ? (
                <div
                  key={`${message.role}-${index}`}
                  className="aster-panel-message aster-panel-message--assistant"
                >
                  <Markdown skipHtml remarkPlugins={[remarkBreaks]}>
                    {message.content}
                  </Markdown>
                </div>
              ) : (
                <p
                  key={`${message.role}-${index}`}
                  className={`aster-panel-message aster-panel-message--${message.role}`}
                >
                  {message.content}
                </p>
              ),
            )}
            {loading ? (
              <p className="aster-panel-message aster-panel-message--status">
                Aster думает…
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <div className="aster-panel-empty" aria-hidden="true">
              <svg
                className="aster-panel-empty-star"
                viewBox="0 0 24 24"
                width="14"
                height="14"
              >
                <path
                  d="M12 3.2 L12.9 10.1 L20 12 L12.9 13.9 L12 20.8 L11.1 13.9 L4 12 L11.1 10.1 Z"
                  fill="currentColor"
                />
              </svg>
              <span>С чего начнём?</span>
            </div>
            <div className="aster-panel-actions">
              {QUICK_ACTIONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="aster-panel-action"
                  disabled={loading}
                  onClick={() => void sendMessage(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {error ? <p className="aster-panel-error">{error}</p> : null}
      </div>

      <form className="aster-panel-composer" onSubmit={onSubmit}>
        <input
          type="text"
          className="aster-panel-input"
          placeholder="Напишите сообщение…"
          aria-label="Сообщение для Aster"
          autoComplete="off"
          maxLength={ASTER_MAX_MESSAGE_LENGTH}
          value={draft}
          disabled={loading}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="submit"
          className="aster-panel-send"
          aria-label="Отправить"
          disabled={loading || !draft.trim()}
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path
              d="M3.2 10.2 L16.5 3.6 L12.2 16.5 L9.4 11.1 Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
