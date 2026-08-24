import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ExamProject } from './ExamProjectCard'

interface ExamProjectDialogProps {
  project: ExamProject | null
  onClose: () => void
}

const focusableSelector = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function AsterContent() {
  const [openDialogue, setOpenDialogue] = useState<string | null>('01')

  const capabilities = [
    'С чего начать',
    'Подобрать AI-инструмент',
    'Построить персональный маршрут',
    'Разобраться в конкретном вопросе',
  ]

  const dialogues = [
    {
      id: '01',
      user: 'Я только начинаю изучать AI. С чего мне начать?',
      aster:
        'Начните не с инструментов, а с задачи. Определите, что вы хотите упростить или создать: тексты, изображения, исследование, автоматизацию или собственный продукт. После этого я помогу подобрать 1-2 инструмента и построить первый маршрут без перегруза.',
    },
    {
      id: '02',
      user: 'Мне нужно быстро подготовить презентацию. Что выбрать?',
      aster:
        'Если нужна структура, текст и визуальная подача в одном процессе, начните с Gamma. Для глубокой проработки содержания можно подготовить основу в ChatGPT или Claude, а затем собрать презентацию в Gamma. Так вы не изучаете десятки сервисов, а используете короткую рабочую связку.',
    },
    {
      id: '03',
      user: 'Как понять, какие AI-инструменты нужны именно моей работе?',
      aster:
        'Начните с повторяющихся задач. Выпишите 3-5 действий, которые занимают больше всего времени, и оцените, что из них можно ускорить: поиск информации, тексты, визуал, анализ или коммуникацию. После этого выбирайте инструменты под конкретный процесс, а не по популярности.',
    },
  ]

  const architecture = [
    'Пользователь',
    'интерфейс Aster',
    'серверный API',
    'Gemini',
    'ответ в контексте AI Compass',
  ]

  const toggleDialogue = (dialogueId: string) => {
    setOpenDialogue((current) => (current === dialogueId ? null : dialogueId))
  }

  return (
    <div className="exam-dialog-stack exam-aster-content">
      <p className="exam-dialog-lead">
        Aster помогает разобраться в мире искусственного интеллекта, выбрать подходящие инструменты и определить ясный следующий шаг.
      </p>

      <section className="exam-aster-section" aria-labelledby="exam-aster-role">
        <h3 id="exam-aster-role">Роль</h3>
        <p>
          Не просто отвечает на вопросы, а помогает превратить неопределённость в понятный маршрут: от задачи пользователя к подходящему AI-инструменту и следующему действию.
        </p>
      </section>

      <section className="exam-aster-section" aria-labelledby="exam-aster-capabilities">
        <h3 id="exam-aster-capabilities">Что умеет</h3>
        <ul className="exam-aster-capabilities">
          {capabilities.map((capability) => (
            <li key={capability}>
              <span aria-hidden="true">✦</span>
              {capability}
            </li>
          ))}
        </ul>
      </section>

      <section className="exam-aster-section" aria-labelledby="exam-aster-dialogues">
        <h3 id="exam-aster-dialogues">Как Aster работает</h3>
        <div className="exam-aster-dialogues">
          {dialogues.map((dialogue) => {
            const isOpen = openDialogue === dialogue.id
            const panelId = `exam-aster-dialogue-${dialogue.id}`

            return (
              <article
                key={dialogue.id}
                className="exam-aster-dialogue"
                data-open={isOpen}
              >
                <button
                  type="button"
                  className="exam-aster-dialogue-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleDialogue(dialogue.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleDialogue(dialogue.id)
                    }
                  }}
                >
                  <span className="exam-aster-dialogue-number">
                    Диалог {dialogue.id}
                  </span>
                  <svg
                    className="exam-aster-dialogue-indicator"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.5 7.5L10 12l4.5-4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  id={panelId}
                  className="exam-aster-dialogue-panel"
                  aria-hidden={!isOpen}
                >
                  <div className="exam-aster-dialogue-body">
                    <div className="exam-aster-message exam-aster-message-user">
                      <span>Пользователь</span>
                      <p>{dialogue.user}</p>
                    </div>
                    <div className="exam-aster-message exam-aster-message-assistant">
                      <span>Aster</span>
                      <p>{dialogue.aster}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="exam-aster-section" aria-labelledby="exam-aster-architecture">
        <h3 id="exam-aster-architecture">Как устроен</h3>
        <ol className="exam-aster-flow" aria-label="Схема работы Aster">
          {architecture.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="exam-aster-technical-note">
          Работает на базе Gemini и встроен в AI Compass.
        </p>
      </section>

      <p className="exam-aster-live-note">
        <span aria-hidden="true">✦</span>
        Aster доступен через плавающую звезду в правом нижнем углу сайта.
      </p>
    </div>
  )
}

function ImagesContent() {
  const works = [
    {
      id: '01',
      title: 'Парящий город AI Compass',
      src: '/images/exam/01-floating-ai-compass-city.png',
      description:
        'Футуристический город, парящий над зеркальной водой. В центре - сияющий кристалл, вокруг - архитектура будущего, планеты, золотые орбиты и световые маршруты. Эта иллюстрация задаёт общий визуальный язык всей серии.',
      prompt:
        'Величественный парящий город AI Compass, зависший над спокойным зеркальным водным миром; изящные футуристические башни и купола; в центре - сияющее голубое кристаллическое ядро; тонкие золотые орбитальные линии в небе; огромные планеты и луны; небольшие футуристические корабли; световые водопады; глубокая сине-бирюзовая атмосфера с тёплым золотым светом заката; кинематографичная научно-фантастическая иллюстрация с элементами сказочной эстетики; эпический масштаб; очень высокая детализация; элегантная, воздушная, премиальная композиция; без текста и без инфографики.',
    },
    {
      id: '02',
      title: 'Мир AI-инструментов',
      src: '/images/exam/02-ai-tools-world.png',
      description:
        'AI-инструменты представлены как отдельные светящиеся планеты внутри единой системы. ChatGPT, Claude, Gemini и Midjourney становятся частью одной космической экосистемы, соединённой тонкими золотыми маршрутами.',
      prompt:
        'Красивый футуристический мир AI-инструментов; несколько крупных полупрозрачных сияющих планет, представляющих ChatGPT, Claude, Gemini и Midjourney, парят над элегантным небесным городом; каждая планета лёгкая, воздушная, словно стеклянная; планеты соединены тонкими золотыми орбитальными маршрутами вокруг светящегося центрального кристалла; глубокое синее космическое небо; отражающая вода; парящая архитектура; тёплые золотые акценты; кинематографичная научно-фантастическая иллюстрация; очень высокая детализация; элегантный, сбалансированный и премиальный визуальный стиль; аккуратные читаемые подписи: ChatGPT, Claude, Gemini, Midjourney.',
    },
    {
      id: '03',
      title: 'Кристалл - сердце мира',
      src: '/images/exam/03-crystal-heart-of-world.png',
      description:
        'Центральный кристалл символизирует энергию, знание и внутренний источник развития. Он становится смысловым и визуальным центром мира AI Compass.',
      prompt:
        'Монументальный сияющий кристалл как сердце вселенной AI Compass, парящий над светящейся круглой платформой в огромном небесном городе; кристалл излучает голубовато-белую и тёплую золотую энергию; вокруг него - тонкая золотая навигационная геометрия, парящие города, планеты, кристальные башни, отражающая вода и звёздное небо; на переднем плане небольшая человеческая фигура, созерцающая кристалл; кинематографичная научно-фантастическая иллюстрация с мягкой фантазийной эстетикой; величественная композиция; очень высокая детализация; глубокая сине-золотая палитра; заголовок «КРИСТАЛЛ - СЕРДЦЕ МИРА»; подписи: «ЗНАНИЕ - освещает путь», «ВДОХНОВЕНИЕ - зажигает идеи», «СОЗДАНИЕ - превращает мечты в реальность», «НАВИГАЦИЯ - ведёт к цели», «AI COMPASS - ТВОЙ ПУТЬ В МИРЕ ИИ».',
    },
    {
      id: '04',
      title: 'Портал знаний',
      src: '/images/exam/04-portal-of-knowledge.png',
      description:
        'Портал символизирует переход в новые области знаний. Вокруг него расположены направления исследования: архив знаний, методы, каталог ИИ, идеи, практика и сообщество.',
      prompt:
        'Величественный небесный Портал Знаний во вселенной AI Compass; огромные изящные круглые врата, наполненные сияющей сине-фиолетовой галактикой; золотые архитектурные детали и тонкая орбитальная геометрия; вдали - парящие города и кристальные структуры; отражающий пол и светящиеся пути; перед порталом стоит изящная женская фигура; глубокая синяя космическая атмосфера с тёплым золотым светом; кинематографичная научно-фантастическая иллюстрация с мягкой фантазийной эстетикой; очень высокая детализация; элегантно и вдохновляюще; заголовок «ПОРТАЛ ЗНАНИЙ»; подзаголовок «Каждый вопрос открывает новую вселенную»; полупрозрачные сияющие сферы знаний с подписями: «АРХИВ ЗНАНИЙ», «МЕТОДЫ», «КАТАЛОГ ИИ», «ИДЕИ И ВДОХНОВЕНИЕ», «ПРАКТИКА», «СООБЩЕСТВО».',
    },
    {
      id: '05',
      title: 'Навигатор будущего',
      src: '/images/exam/05-navigator-of-future.png',
      description:
        'Финальная иллюстрация показывает человека внутри вселенной AI Compass. Девушка стоит перед огромным миром искусственного интеллекта и выбирает собственный путь - образ осознанной навигации, выбора и движения вперёд.',
      prompt:
        'Кинематографичная вселенная AI Compass в сине-золотых сумерках; красивая элегантная молодая блондинка с длинными распущенными волосами стоит босиком на небесной навигационной платформе; она показана со спины и немного в профиль; на ней изящное струящееся платье цвета айвори, женственное, закрытое, лёгкое и реалистичное; девушка смотрит на огромный футуристический город с парящими башнями, планетами, отражающей водой и светящимся голубым кристаллом вдали; в центре неба - большая сияющая золотая звезда-компас; вокруг - тонкие линии созвездий и орбитальная геометрия; глубокий насыщенный синий фон, гармонирующий со всей серией; тёплые золотые акценты; реалистичная визуализация; очень высокая детализация; премиальная кинематографичная научно-фантастическая эстетика; заголовок «НАВИГАТОР БУДУЩЕГО»; подзаголовок «Тот, кто умеет видеть путь»; четыре смысловых блока: «ВИДЕНИЕ - видеть больше, чем очевидное», «ВЫБОР - принимать решения осознанно», «СМЫСЛ - понимать глубже», «ПУТЬ - действовать своим курсом».',
    },
  ]

  const [openPrompt, setOpenPrompt] = useState<string | null>(null)
  const [previewWork, setPreviewWork] = useState<(typeof works)[number] | null>(null)
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null)
  const previewCloseRef = useRef<HTMLButtonElement | null>(null)
  const previewPanelRef = useRef<HTMLDivElement | null>(null)

  const closePreview = () => {
    setPreviewWork(null)
    window.requestAnimationFrame(() => previewTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (!previewWork) return

    window.requestAnimationFrame(() => previewCloseRef.current?.focus())

    const handlePreviewKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        closePreview()
        return
      }

      if (event.key === 'Tab' && previewPanelRef.current) {
        event.preventDefault()
        previewCloseRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handlePreviewKeyDown, true)
    return () => document.removeEventListener('keydown', handlePreviewKeyDown, true)
  }, [previewWork])

  return (
    <>
      <div className="exam-dialog-stack exam-images-content">
        <p className="exam-dialog-lead">
          Серия из пяти иллюстраций, созданных в едином визуальном языке AI Compass: глубокий космос, шампань-золото, свет, технологичность и ощущение исследования.
        </p>

        <div className="exam-images-gallery" aria-label="Галерея работ AI Compass">
          {works.map((work) => {
            const promptOpen = openPrompt === work.id
            const promptId = `exam-image-prompt-${work.id}`

            return (
              <article key={work.id} className="exam-images-work">
                <button
                  type="button"
                  className="exam-images-work-preview"
                  onClick={(event) => {
                    previewTriggerRef.current = event.currentTarget
                    setPreviewWork(work)
                  }}
                  aria-label={`Открыть крупный просмотр: ${work.title}`}
                >
                  <span className="exam-images-work-visual">
                    <img src={work.src} alt={work.title} />
                  </span>
                </button>

                <div className="exam-images-work-copy">
                  <span className="exam-images-work-number">{work.id}</span>
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                </div>

                <button
                  type="button"
                  className="exam-images-prompt-trigger"
                  aria-expanded={promptOpen}
                  aria-controls={promptId}
                  onClick={() => setOpenPrompt(promptOpen ? null : work.id)}
                >
                  <span>{promptOpen ? 'Скрыть промпт' : 'Показать промпт'}</span>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  id={promptId}
                  className="exam-images-prompt-panel"
                  data-open={promptOpen}
                  aria-hidden={!promptOpen}
                >
                  <p>{work.prompt}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {previewWork
        ? createPortal(
            <div
              className="exam-image-lightbox"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closePreview()
              }}
            >
              <div
                ref={previewPanelRef}
                className="exam-image-lightbox-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exam-image-lightbox-title"
              >
                <header className="exam-image-lightbox-header">
                  <div>
                    <span>{previewWork.id}</span>
                    <h3 id="exam-image-lightbox-title">{previewWork.title}</h3>
                  </div>
                  <button
                    ref={previewCloseRef}
                    type="button"
                    className="exam-image-lightbox-close"
                    onClick={closePreview}
                    aria-label="Закрыть крупный просмотр"
                  >
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </header>

                <div className="exam-image-lightbox-visual">
                  <img src={previewWork.src} alt={previewWork.title} />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}

function WebsiteContent() {
  const capabilities = [
    'интерактивный лендинг AI Compass',
    'собственная визуальная вселенная',
    'маршрут по миру AI',
    'встроенный AI-ассистент Aster',
    'адаптивный интерфейс',
    'анимации и интерактивные элементы',
  ]
  const technologies = ['React', 'Vite', 'TypeScript', 'CSS', 'Gemini']
  const developmentTools = ['ChatGPT', 'Cursor', 'Codex']
  const process = ['Идея', 'Art Direction', 'Vibe Coding', 'Aster', 'Тестирование', 'Готовый продукт']

  return (
    <div className="exam-dialog-stack exam-website-content">
      <div className="exam-website-intro">
        <p className="exam-website-tagline">Персональный маршрут в мире искусственного интеллекта.</p>
        <p className="exam-dialog-lead">
          AI Compass - интерактивный веб-продукт, который помогает разобраться в мире AI-инструментов, выбрать подходящее направление и определить ясный следующий шаг.
        </p>
      </div>

      <section className="exam-website-section" aria-labelledby="exam-website-idea">
        <h3 id="exam-website-idea">Идея проекта</h3>
        <p>
          Вместо бесконечного изучения нейросетей - понятная система, нужные инструменты и ясный следующий шаг, который подходит именно вам.
        </p>
      </section>

      <section className="exam-website-section" aria-labelledby="exam-website-capabilities">
        <h3 id="exam-website-capabilities">Что реализовано</h3>
        <ul className="exam-website-capabilities">
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="exam-website-section" aria-labelledby="exam-website-technologies">
        <h3 id="exam-website-technologies">Технологии</h3>
        <ul className="exam-website-technologies" aria-label="Технологии проекта">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <section className="exam-website-section" aria-labelledby="exam-website-development-tools">
        <h3 id="exam-website-development-tools">AI И ИНСТРУМЕНТЫ РАЗРАБОТКИ</h3>
        <ul className="exam-website-technologies" aria-label="AI и инструменты разработки">
          {developmentTools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="exam-website-section" aria-labelledby="exam-website-process">
        <h3 id="exam-website-process">Процесс</h3>
        <ol className="exam-website-process" aria-label="Процесс создания AI Compass">
          {process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="exam-website-section exam-website-result" aria-labelledby="exam-website-result">
        <h3 id="exam-website-result">Живой результат</h3>
        <p>
          Проект объединяет визуальный дизайн, навигацию, AI-ассистента и интерактивный пользовательский опыт в одной системе.
        </p>
      </section>
    </div>
  )
}

function formatTrackTime(value: number) {
  const totalSeconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function TrackContent() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(214.848)
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0

  useEffect(() => {
    const audio = audioRef.current

    return () => {
      if (!audio) return
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }

  return (
    <div className="exam-dialog-stack">
      <p className="exam-dialog-lead">
        Midnight in Moscow - атмосферный deep house трек с ночным, городским настроением. Для меня он скорее про состояние: ритм большого города, движение, свободу и ощущение ночи, когда пространство вокруг становится более личным и кинематографичным.
      </p>

      <div className="exam-track-player">
        <img
          className="exam-track-cover"
          src="/audio/midnight-in-moscow.jpeg"
          alt="Обложка Midnight in Moscow"
        />

        <div className="exam-track-player-body">
          <span className="exam-placeholder-label">TRACK PLAYER</span>
          <h3>Midnight in Moscow</h3>
          <p className="exam-track-player-meta">deep house, minimal <span aria-hidden="true">·</span> 3:34</p>

          <audio
            ref={audioRef}
            src="/audio/midnight-in-moscow.mp3"
            preload="metadata"
            onLoadedMetadata={(event) => {
              if (Number.isFinite(event.currentTarget.duration)) {
                setDuration(event.currentTarget.duration)
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0
              setCurrentTime(0)
              setIsPlaying(false)
            }}
          />

          <div className="exam-track-controls">
            <button
              type="button"
              className="exam-track-play-button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Пауза' : 'Воспроизвести Midnight in Moscow'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6.5 5.5v9M13.5 5.5v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 5.5l7 4.5-7 4.5v-9z" fill="currentColor" />
                </svg>
              )}
            </button>

            <div className="exam-track-timeline">
              <input
                type="range"
                className="exam-track-progress"
                min="0"
                max={duration || 0}
                step="0.01"
                value={Math.min(currentTime, duration || 0)}
                aria-label="Позиция воспроизведения"
                style={{
                  background: `linear-gradient(to right, rgba(230, 210, 162, 0.9) 0 ${progress}%, rgba(230, 210, 162, 0.15) ${progress}% 100%)`,
                }}
                onChange={(event) => {
                  const nextTime = Number(event.currentTarget.value)
                  if (audioRef.current) audioRef.current.currentTime = nextTime
                  setCurrentTime(nextTime)
                }}
              />
              <div className="exam-track-times" aria-live="off">
                <span>{formatTrackTime(currentTime)}</span>
                <span>{formatTrackTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketingContent() {
  const [openPost, setOpenPost] = useState<string | null>('01')
  const [isPresentationOpen, setIsPresentationOpen] = useState(false)
  const presentationButtonRef = useRef<HTMLButtonElement>(null)
  const presentationViewerRef = useRef<HTMLDivElement>(null)
  const presentationCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isPresentationOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => presentationCloseRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        setIsPresentationOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      event.stopImmediatePropagation()
      const focusable = Array.from(
        presentationViewerRef.current?.querySelectorAll<HTMLElement>('button, iframe, [tabindex]:not([tabindex="-1"])') ?? [],
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown, true)
      if (presentationButtonRef.current?.isConnected) presentationButtonRef.current.focus()
    }
  }, [isPresentationOpen])

  const posts = [
    {
      id: '01',
      title: 'С чего начать именно мне?',
      paragraphs: [
        'Кажется, что мир AI растёт быстрее, чем мы успеваем в нём разобраться.',
        'Новые нейросети появляются каждый день. ChatGPT, Claude, Gemini, Midjourney, Suno, Cursor. Десятки инструментов, сотни возможностей.',
        'Но главный вопрос остаётся тем же: С чего начать именно мне?',
        'Проблема не в недостатке информации. Проблема в её избытке.',
        'Когда вокруг слишком много инструментов, легко начать изучать всё подряд и в итоге так и не понять, что действительно пригодится именно вам.',
        'AI Compass - ваш персональный маршрут в мире искусственного интеллекта.',
        'Вместо бесконечного изучения нейросетей: понятная система, подходящие инструменты и ясный следующий шаг.',
        'Не нужно знать всё. Важно понимать, куда двигаться дальше.',
      ],
    },
    {
      id: '02',
      title: 'Что действительно нужно именно вам?',
      paragraphs: [
        'AI Compass не просто показывает, какие нейросети существуют.',
        'Он помогает понять, какие из них действительно нужны именно вам.',
        'Одному человеку AI нужен для текстов и идей. Другому для дизайна и визуального контента. Третьему для работы, бизнеса, автоматизации или создания собственных проектов.',
        'Поэтому универсального списка «лучших нейросетей» не существует.',
        'Есть только инструменты, которые подходят под конкретную задачу.',
        'AI Compass помогает увидеть эту связь.',
        'Вы определяете своё направление, знакомитесь с подходящими AI-инструментами и получаете понятный маршрут без лишнего информационного шума.',
        'Не нужно изучать всё подряд. Нужно понять, что поможет именно вам двигаться дальше.',
      ],
    },
    {
      id: '03',
      title: 'Вместо десятков вкладок - ясная картина',
      paragraphs: [
        'Представьте, что вместо десятков открытых вкладок, сохранённых видео и списков нейросетей у вас наконец появляется понятная картина.',
        'Вы знаете, какие AI-инструменты подходят вашим задачам. Понимаете, что стоит изучать сейчас. И видите, какой следующий шаг действительно имеет смысл.',
        'Именно для этого создан AI Compass.',
        'Это не попытка рассказать вам обо всём искусственном интеллекте сразу.',
        'Это способ убрать лишний шум, увидеть свои возможности и двигаться дальше по понятному маршруту.',
        'AI Compass - ваш персональный маршрут в мире искусственного интеллекта.',
        'Понятная система. Подходящие инструменты. Ясный следующий шаг.',
        'Потому что в мире AI важно не знать всё. Важно знать, что делать дальше.',
      ],
    },
  ]

  const reels = [
    ['0-4 сек', 'Хаос AI-инструментов.'],
    ['4-8 сек', '«Но вам и не нужно знать всё.»'],
    ['8-14 сек', '«Ваши задачи.\nВаши инструменты.\nВаш маршрут.»'],
    ['14-19 сек', 'Появляется Aster и маршрут.'],
    ['19-25 сек', 'AI Compass.\n«Ваш персональный маршрут в мире искусственного интеллекта.»'],
  ]

  const presentation = [
    'AI Compass и ключевой оффер',
    'Проблема информационного шума',
    'AI Compass как персональный маршрут',
    'Связь задач, инструментов и следующего шага',
    'Aster как AI-ассистент и проводник',
    'Три продающих поста',
    'Раскадровка Reels',
    'Финальный слоган и позиционирование',
  ]

  return (
    <div className="exam-dialog-stack exam-marketing-content">
      <p className="exam-dialog-lead">
        Единая маркетинговая система продукта: оффер, три продающих поста, сценарий Reels и презентация в одном визуальном стиле.
      </p>

      <section className="exam-marketing-offer" aria-labelledby="exam-marketing-offer-title">
        <span className="exam-placeholder-label">ОФФЕР</span>
        <h3 id="exam-marketing-offer-title">AI Compass - ваш персональный маршрут в мире искусственного интеллекта.</h3>
        <p>Вместо бесконечного изучения нейросетей: понятная система, подходящие инструменты и ясный следующий шаг.</p>
        <p className="exam-marketing-offer-note">Не нужно знать всё.<br />Важно понимать, куда двигаться дальше.</p>
      </section>

      <section className="exam-marketing-section" aria-labelledby="exam-marketing-posts-title">
        <div className="exam-marketing-section-heading">
          <span className="exam-placeholder-label">КОНТЕНТ</span>
          <h3 id="exam-marketing-posts-title">3 продающих поста</h3>
        </div>
        <div className="exam-marketing-posts">
          {posts.map((post) => {
            const isOpen = openPost === post.id
            const panelId = `exam-marketing-post-${post.id}`

            return (
              <article key={post.id} className={`exam-marketing-post${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="exam-marketing-post-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenPost(isOpen ? null : post.id)}
                >
                  <span><b>{post.id}</b> Пост {post.id}</span>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id={panelId} className="exam-marketing-post-panel" hidden={!isOpen}>
                  <h4>{post.title}</h4>
                  {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="exam-marketing-section" aria-labelledby="exam-marketing-reels-title">
        <div className="exam-marketing-section-heading">
          <span className="exam-placeholder-label">20-25 СЕКУНД</span>
          <h3 id="exam-marketing-reels-title">Сценарий Reels</h3>
        </div>
        <ol className="exam-marketing-reels">
          {reels.map(([time, text]) => (
            <li key={time}>
              <span>{time}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className="exam-marketing-reels-final">«Не изучайте AI случайно. Исследуйте его осознанно.»</p>
      </section>

      <section className="exam-marketing-section" aria-labelledby="exam-marketing-presentation-title">
        <div className="exam-marketing-section-heading">
          <span className="exam-placeholder-label">СТРУКТУРА</span>
          <h3 id="exam-marketing-presentation-title">Презентация</h3>
        </div>
        <ol className="exam-marketing-presentation">
          {presentation.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
          ))}
        </ol>
      </section>

      <section className="exam-marketing-pdf" aria-labelledby="exam-marketing-pdf-title">
        <div>
          <span className="exam-placeholder-label">ФИНАЛЬНАЯ ПРЕЗЕНТАЦИЯ</span>
          <h3 id="exam-marketing-pdf-title">Маркетинговая программа AI Compass</h3>
          <p>Оффер · 3 продающих поста · Reels · презентация</p>
        </div>
        <button
          ref={presentationButtonRef}
          type="button"
          className="exam-marketing-pdf-link"
          aria-haspopup="dialog"
          onClick={() => setIsPresentationOpen(true)}
        >
          Открыть презентацию
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M6 14L14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {isPresentationOpen
        ? createPortal(
            <div
              className="exam-marketing-pdf-viewer"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsPresentationOpen(false)
              }}
            >
              <div
                ref={presentationViewerRef}
                className="exam-marketing-pdf-viewer-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exam-marketing-pdf-viewer-title"
              >
                <header className="exam-marketing-pdf-viewer-bar">
                  <h2 id="exam-marketing-pdf-viewer-title">Маркетинговая программа AI Compass</h2>
                  <div className="exam-marketing-pdf-viewer-actions">
                    <button type="button" onClick={() => setIsPresentationOpen(false)}>
                      Назад к AI Compass
                    </button>
                    <button
                      ref={presentationCloseRef}
                      type="button"
                      className="exam-marketing-pdf-viewer-close"
                      aria-label="Закрыть презентацию"
                      onClick={() => setIsPresentationOpen(false)}
                    >
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </header>
                <iframe
                  src="/documents/AI-Compass-Marketing-Program-Final.pdf"
                  title="Маркетинговая программа AI Compass - PDF"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function AutomationContent() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const demoButtonRef = useRef<HTMLButtonElement>(null)
  const demoViewerRef = useRef<HTMLDivElement>(null)
  const demoCloseRef = useRef<HTMLButtonElement>(null)
  const demoVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isDemoOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => demoCloseRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        setIsDemoOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      event.stopImmediatePropagation()
      const focusable = Array.from(
        demoViewerRef.current?.querySelectorAll<HTMLElement>(
          `${focusableSelector}, video[controls]`,
        ) ?? [],
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      demoVideoRef.current?.pause()
      if (demoVideoRef.current) demoVideoRef.current.currentTime = 0
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown, true)
      if (demoButtonRef.current?.isConnected) demoButtonRef.current.focus()
    }
  }, [isDemoOpen])

  const workflowSteps = [
    'ТЕМА',
    'AI-АГЕНТ',
    '3 ФОРМАТА КОНТЕНТА',
    'САМОПРОВЕРКА',
    'ГОТОВЫЙ РЕЗУЛЬТАТ',
  ]

  const outputs = [
    ['ОСНОВНОЙ ПОСТ', 'Развёрнутый контент по теме.'],
    ['КОРОТКИЙ ПОСТ', 'Краткая версия для быстрой публикации.'],
    ['REELS', 'Сценарий короткого вертикального видео.'],
  ]

  const technologies = [
    'Gemini',
    'Python',
    'Local Web Interface',
    'Prompt System',
    'Brand Rules',
    'Automated Checks',
  ]

  const launchSteps = [
    'Запустить start.command',
    'Откроется локальная панель',
    'Ввести тему',
    'Нажать «Создать контент»',
    'Получить 3 готовых формата',
    'Проверить 17 критериев',
  ]

  return (
    <div className="exam-dialog-stack exam-automation-content">
      <p className="exam-dialog-lead">
        Рабочая AI-автоматизация для создания контента AI Compass. Одна тема превращается в три готовых формата с автоматической проверкой результата.
      </p>

      <section className="exam-automation-section exam-automation-workflow">
        <p className="exam-section-label">КАК ЭТО РАБОТАЕТ</p>
        <div className="exam-automation-flow" aria-label="Схема автоматизации">
          {workflowSteps.map((step, index) => (
            <div key={step} className="exam-automation-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              {index < workflowSteps.length - 1 ? <b aria-hidden="true">→</b> : null}
            </div>
          ))}
        </div>
        <p className="exam-automation-workflow-note">
          Пользователь вводит тему один раз. Система создаёт основной пост, короткий пост и сценарий Reels в стиле AI Compass.
        </p>
      </section>

      <section className="exam-automation-section">
        <p className="exam-section-label">РЕЗУЛЬТАТ</p>
        <div className="exam-automation-outputs">
          {outputs.map(([title, description], index) => (
            <article key={title} className="exam-automation-output">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="exam-automation-section exam-automation-check">
        <div>
          <p className="exam-section-label">АВТОМАТИЧЕСКАЯ САМОПРОВЕРКА</p>
          <p>После генерации система автоматически проверяет результат по 17 критериям.</p>
        </div>
        <strong aria-label="17 из 17, PASS">
          <span>17 / 17</span>
          PASS
        </strong>
      </section>

      <section className="exam-automation-section exam-automation-demo" aria-labelledby="exam-automation-demo-title">
        <p id="exam-automation-demo-title" className="exam-section-label">ДЕМО АВТОМАТИЗАЦИИ</p>
        <button
          ref={demoButtonRef}
          type="button"
          aria-haspopup="dialog"
          onClick={() => setIsDemoOpen(true)}
        >
          Открыть демо
        </button>
      </section>

      <section className="exam-automation-section">
        <p className="exam-section-label">КАК СОЗДАНО</p>
        <ul className="exam-automation-technologies" aria-label="Технологии автоматизации">
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="exam-automation-section">
        <p className="exam-section-label">СЦЕНАРИЙ ЗАПУСКА</p>
        <ol className="exam-automation-launch">
          {launchSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="exam-automation-local-note">
          Автоматизация запускается отдельно от основного сайта AI Compass.
        </p>
      </section>

      <section className="exam-automation-section">
        <p className="exam-section-label">LIVE AI</p>
        <div className="exam-automation-providers">
          <p><strong>Gemini</strong><span>основной AI-провайдер</span></p>
          <p><strong>OpenAI</strong><span>резервный провайдер</span></p>
        </div>
      </section>

      {isDemoOpen
        ? createPortal(
            <div
              className="exam-automation-viewer"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsDemoOpen(false)
              }}
            >
              <div
                ref={demoViewerRef}
                className="exam-automation-viewer-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exam-automation-viewer-title"
              >
                <header className="exam-automation-viewer-bar">
                  <h2 id="exam-automation-viewer-title">AI Compass Content Assistant</h2>
                  <div className="exam-automation-viewer-actions">
                    <button type="button" onClick={() => setIsDemoOpen(false)}>
                      Назад к AI Compass
                    </button>
                    <button
                      ref={demoCloseRef}
                      type="button"
                      className="exam-automation-viewer-close"
                      aria-label="Закрыть демо"
                      onClick={() => setIsDemoOpen(false)}
                    >
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </header>
                <div className="exam-automation-viewer-stage">
                  <video
                    ref={demoVideoRef}
                    src="/media/automation/ai-compass-content-assistant-demo.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Демонстрация AI Compass Content Assistant"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function ProjectContent({ project }: { project: ExamProject }) {
  switch (project.id) {
    case 'aster':
      return <AsterContent />
    case 'images':
      return <ImagesContent />
    case 'website':
      return <WebsiteContent />
    case 'track':
      return <TrackContent />
    case 'marketing':
      return <MarketingContent />
    case 'automation':
      return <AutomationContent />
  }
}

export default function ExamProjectDialog({ project, onClose }: ExamProjectDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const titleId = `exam-dialog-title-${project.id}`

  return (
    <div
      className="exam-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="exam-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="exam-dialog-header">
          <div>
            <span className="exam-dialog-number">{project.number}</span>
            <p>EXAM PROJECT</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="exam-dialog-close"
            onClick={onClose}
            aria-label="Закрыть проект"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="exam-dialog-scroll">
          <div className="exam-dialog-title-block">
            <h2 id={titleId}>{project.title}</h2>
            <p>
              {project.id === 'aster'
                ? 'Персональный AI-навигатор AI Compass'
                : project.id === 'website'
                  ? 'AI Compass'
                : project.description}
            </p>
          </div>
          <ProjectContent project={project} />
        </div>
      </div>
    </div>
  )
}
