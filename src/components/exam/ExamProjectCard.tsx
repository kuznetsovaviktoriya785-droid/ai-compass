import type { ReactNode } from 'react'

export type ExamProjectId =
  | 'aster'
  | 'images'
  | 'website'
  | 'track'
  | 'marketing'
  | 'automation'

export interface ExamProject {
  id: ExamProjectId
  number: string
  title: string
  description: string
}

interface ExamProjectCardProps {
  project: ExamProject
  onOpen: (project: ExamProject, trigger: HTMLButtonElement) => void
}

function ProjectMark({ id }: { id: ExamProjectId }): ReactNode {
  const commonProps = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    'aria-hidden': true,
  }

  switch (id) {
    case 'aster':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="17" opacity=".34" />
          <path d="M24 7.5l2.1 13.9L38 24l-11.9 2.6L24 40.5l-2.1-13.9L10 24l11.9-2.6L24 7.5z" />
        </svg>
      )
    case 'images':
      return (
        <svg {...commonProps}>
          <rect x="8" y="11" width="25" height="25" rx="3" />
          <path d="M15 30l6-7 5 5 3-3 8 9" />
          <path d="M17 17.5h.01" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 7h25v26" opacity=".42" />
        </svg>
      )
    case 'website':
      return (
        <svg {...commonProps}>
          <rect x="6.5" y="9" width="35" height="28" rx="3" />
          <path d="M7 16h34M12 12.5h.01M16 12.5h.01M20 12.5h.01" strokeLinecap="round" />
          <path d="M13 23h12M13 28h20" opacity=".58" />
        </svg>
      )
    case 'track':
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="16" opacity=".34" />
          <circle cx="24" cy="24" r="5" />
          <path d="M8 24h5l2-7 4 14 4-20 4 25 3-12h10" />
        </svg>
      )
    case 'marketing':
      return (
        <svg {...commonProps}>
          <path d="M8 29h7l18 8V11L15 19H8v10z" />
          <path d="M15 29l3 9h7l-4-7M37 18c2 1.5 3 3.5 3 6s-1 4.5-3 6" opacity=".55" />
        </svg>
      )
    case 'automation':
      return (
        <svg {...commonProps}>
          <circle cx="10" cy="24" r="4" />
          <circle cx="38" cy="12" r="4" />
          <circle cx="38" cy="36" r="4" />
          <path d="M14 24h8c7 0 7-12 12-12M22 24c7 0 7 12 12 12" />
        </svg>
      )
  }
}

export default function ExamProjectCard({ project, onOpen }: ExamProjectCardProps) {
  return (
    <article className="exam-card-wrap">
      <button
        type="button"
        className="exam-card"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
      >
        <span className="exam-card-topline">
          <span className="exam-card-number">{project.number}</span>
          <span className="exam-card-mark">
            <ProjectMark id={project.id} />
          </span>
        </span>

        <span className="exam-card-copy">
          <span className="exam-card-title">{project.title}</span>
          <span className="exam-card-description">{project.description}</span>
        </span>

        <span className="exam-card-action">
          Открыть проект
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </article>
  )
}
