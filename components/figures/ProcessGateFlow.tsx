'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cx } from '@/lib/cx'

/**
 * A compact, interactive overview of the six phase gates. The detailed,
 * accessible breakdown still lives in the card list below this hero.
 */
const GATES = [
  { title: 'Concept & feasibility', deliverables: 'Feasibility report, regulatory strategy, project plan and quote' },
  {
    title: 'Design inputs & planning',
    deliverables: 'Design and development plan, requirements specifications, risk management plan',
  },
  {
    title: 'Detailed design',
    deliverables: 'Frozen design, drawings, BOM, firmware release candidate, design review records',
  },
  {
    title: 'Verification & validation',
    deliverables: 'Test reports, traceability matrix, risk management report, usability engineering file',
  },
  { title: 'Regulatory submission', deliverables: 'Submission-ready documentation, labeling set' },
  { title: 'Design transfer & production', deliverables: 'Validated processes, first production lot' },
]

const AUTO_ADVANCE_MS = 4200

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function ProcessGateFlow({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState(0)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLLIElement | null>>([])
  const paused = interactionPaused || userPaused

  useEffect(() => {
    const viewport = viewportRef.current
    const card = cardRefs.current[activeStep]
    if (!viewport || !card || typeof viewport.scrollTo !== 'function') return

    viewport.scrollTo({
      left: Math.max(0, card.offsetLeft - 4),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [activeStep])

  useEffect(() => {
    if (paused || prefersReducedMotion()) return

    const timer = window.setTimeout(() => {
      setActiveStep((current) => (current + 1) % GATES.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearTimeout(timer)
  }, [activeStep, paused])

  function selectStep(index: number) {
    setActiveStep((index + GATES.length) % GATES.length)
  }

  return (
    <figure
      data-gate-flow=""
      data-paused={paused ? '' : undefined}
      className={cx(className)}
      style={{ '--gate-progress-duration': `${AUTO_ADVANCE_MS}ms` } as CSSProperties}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={() => setInteractionPaused(false)}
      onPointerDown={() => setInteractionPaused(true)}
      onPointerUp={() => setInteractionPaused(false)}
      aria-label="Development process workflow"
    >
      <div
        ref={viewportRef}
        data-gate-viewport=""
        role="group"
        aria-roledescription="carousel"
        aria-label="Development process phases"
        tabIndex={0}
      >
        <ol data-gate-flow-list="">
          {GATES.map((gate, index) => (
            <li
              ref={(element) => { cardRefs.current[index] = element }}
              key={gate.title}
              data-gate-card=""
              data-active={index === activeStep ? '' : undefined}
              data-complete={index < activeStep ? '' : undefined}
              aria-current={index === activeStep ? 'step' : undefined}
              aria-label={`Phase ${index + 1} of ${GATES.length}`}
            >
              <span data-gate-num="">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
              </span>
              <span data-gate-title="">{gate.title}</span>
              <span data-gate-deliv="">{gate.deliverables}</span>
            </li>
          ))}
        </ol>
      </div>

      <div data-gate-controls="">
        <div data-gate-arrows="">
          <button type="button" onClick={() => selectStep(activeStep - 1)} aria-label="Previous development phase">
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((current) => !current)}
            aria-label={userPaused ? 'Resume automatic phase movement' : 'Pause automatic phase movement'}
            aria-pressed={userPaused}
          >
            <span aria-hidden="true">{userPaused ? '▶' : 'Ⅱ'}</span>
          </button>
          <button type="button" onClick={() => selectStep(activeStep + 1)} aria-label="Next development phase">
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>

        <div data-gate-dots="" role="group" aria-label="Choose a development phase">
          {GATES.map((gate, index) => (
            <button
              key={gate.title}
              type="button"
              data-active={index === activeStep ? '' : undefined}
              onClick={() => selectStep(index)}
              aria-label={`Go to phase ${index + 1}: ${gate.title}`}
              aria-current={index === activeStep ? 'step' : undefined}
            />
          ))}
        </div>

        <span data-gate-count="" aria-hidden="true">
          {String(activeStep + 1).padStart(2, '0')} / {String(GATES.length).padStart(2, '0')}
        </span>
      </div>

      <p data-gate-status="" className="sr-only" aria-live={paused ? 'polite' : 'off'}>
        Phase {activeStep + 1} of {GATES.length}: {GATES[activeStep].title}
      </p>
    </figure>
  )
}
