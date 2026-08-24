import { useCallback, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import JourneyStarfield from './JourneyStarfield'
import ExamProjectCard, { type ExamProject } from './exam/ExamProjectCard'
import ExamProjectDialog from './exam/ExamProjectDialog'

const projects: ExamProject[] = [
  {
    id: 'aster',
    number: '01',
    title: 'ASTER',
    description: 'Персональный AI-навигатор',
  },
  {
    id: 'images',
    number: '02',
    title: 'IMAGES',
    description: 'Визуальный мир AI Compass',
  },
  {
    id: 'website',
    number: '03',
    title: 'WEBSITE',
    description: 'Концепция и разработка продукта',
  },
  {
    id: 'track',
    number: '04',
    title: 'TRACK',
    description: 'Музыкальная атмосфера проекта',
  },
  {
    id: 'marketing',
    number: '05',
    title: 'MARKETING',
    description: 'Маркетинговая программа AI Compass',
  },
  {
    id: 'automation',
    number: '06',
    title: 'AUTOMATION',
    description: 'AI Compass Content Assistant',
  },
]

export default function ExamShowcase() {
  const { ref, visible } = useScrollReveal<HTMLElement>(0.1)
  const [activeProject, setActiveProject] = useState<ExamProject | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openProject = useCallback((project: ExamProject, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActiveProject(project)
  }, [])

  const closeProject = useCallback(() => {
    setActiveProject(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <>
      <section
        id="exam-showcase"
        ref={ref}
        className={`exam-showcase relative scroll-mt-20${visible ? ' exam-showcase--visible' : ''}`}
      >
        <div className="exam-showcase-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
          <JourneyStarfield />
          <div className="exam-showcase-haze" />
          <div className="exam-showcase-dust" />
        </div>

        <div className="exam-showcase-stage relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="exam-showcase-heading">
            <p className="exam-showcase-eyebrow">EXAM SHOWCASE</p>
            <h2>
              Шесть заданий. <span>Один AI Compass.</span>
            </h2>
            <p className="exam-showcase-subtitle">
              От идеи и визуального языка до собственного ассистента, музыки, маркетинга и автоматизации.
            </p>
          </header>

          <div className="exam-showcase-grid">
            {projects.map((project) => (
              <ExamProjectCard key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>
        </div>
      </section>

      <ExamProjectDialog project={activeProject} onClose={closeProject} />
    </>
  )
}
