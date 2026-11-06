'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '@/lib/cx'
import Ph from '@/components/ui/Ph'

/**
 * The ten-step production flow from the manufacturing page (spec §9.3). This
 * is the page's only rendering of these steps — unlike the decorative figures
 * on other pages, it is not a recap of a table that follows, so it stays in
 * the accessibility tree rather than being marked `aria-hidden`.
 */
const STEPS: { title: string; detail: ReactNode }[] = [
  {
    title: 'Incoming inspection',
    detail: 'Parts checked against specification, by sampling plan or 100% for critical parts',
  },
  {
    title: 'Kitting',
    detail: 'Parts issued to work orders through our ERP, with lot numbers recorded',
  },
  {
    title: 'PCB assembly',
    detail: (
      <>
        SMT and through-hole assembly <Ph>[in-house / at a qualified partner]</Ph>, with AOI and
        functional board test
      </>
    ),
  },
  {
    title: 'Sub-assembly',
    detail: 'Pneumatic modules, motor assemblies, garments and harnesses',
  },
  {
    title: 'Final assembly',
    detail: 'Assembly to controlled work instructions at each station',
  },
  {
    title: 'End-of-line test',
    detail:
      '100% functional test plus electrical safety (dielectric strength, leakage current, earth continuity)',
  },
  {
    title: 'Burn-in',
    detail: 'Units run under load to catch early failures, where the risk analysis calls for it',
  },
  {
    title: 'Labeling & packaging',
    detail: 'Serial and UDI labels, IFU and validated packaging',
  },
  {
    title: 'Final QC & release',
    detail: 'Device history record reviewed and the lot released by quality',
  },
  {
    title: 'Shipping',
    detail: 'To your warehouses or distributors in the US, EU and Australia, with a certificate of conformance',
  },
]

export default function ProductionFlowFigure({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = useState(0)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  // Only scroll the tab strip in response to an actual step change (keyboard
  // or click), never on mount/remount — a cached page reactivating with the
  // same step must not re-trigger scrollIntoView, which (lacking a vertically
  // scrollable ancestor here) falls back to scrolling the whole window.
  const lastStepRef = useRef(activeStep)
  useEffect(() => {
    if (lastStepRef.current === activeStep) return
    lastStepRef.current = activeStep
    const tab = tabsRef.current[activeStep]
    if (typeof tab?.scrollIntoView !== 'function') return
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeStep])

  function selectStep(index: number, focus = false) {
    const next = (index + STEPS.length) % STEPS.length
    setActiveStep(next)
    if (focus) tabsRef.current[next]?.focus()
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      selectStep(index + 1, true)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      selectStep(index - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectStep(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectStep(STEPS.length - 1, true)
    }
  }

  const active = STEPS[activeStep]

  return (
    <div data-production-flow="" className={cx('ui-pflow', className)}>
      <div data-production-track="" role="tablist" aria-label="Production flow stages">
        {STEPS.map((step, index) => (
          <button
            ref={(element) => { tabsRef.current[index] = element }}
            key={step.title}
            id={`production-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === activeStep}
            aria-controls="production-panel"
            tabIndex={index === activeStep ? 0 : -1}
            onClick={() => selectStep(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.title}</strong>
          </button>
        ))}
      </div>

      <div data-production-detail="">
        <div
          id="production-panel"
          role="tabpanel"
          aria-labelledby={`production-tab-${activeStep}`}
          tabIndex={0}
        >
          <span data-production-label="">Station {String(activeStep + 1).padStart(2, '0')}</span>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
        </div>
        <div data-production-controls="">
          <button type="button" onClick={() => selectStep(activeStep - 1)} aria-label="Previous production stage">
            <span aria-hidden="true">←</span>
          </button>
          <span aria-hidden="true">{String(activeStep + 1).padStart(2, '0')} / {STEPS.length}</span>
          <button type="button" onClick={() => selectStep(activeStep + 1)} aria-label="Next production stage">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
