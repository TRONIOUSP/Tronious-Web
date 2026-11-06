'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * The ten-step production flow from the manufacturing page (spec §9.3). This
 * is the page's only rendering of these steps — unlike the decorative figures
 * on other pages, it is not a recap of a table that follows, so it stays in
 * the accessibility tree rather than being marked `aria-hidden`.
 */
const STEPS: { title: string; phase: string; control: string; detail: ReactNode }[] = [
  {
    title: 'Incoming inspection',
    phase: 'Materials',
    control: 'Specification check and sampling plan',
    detail: 'Parts checked against specification, by sampling plan or 100% for critical parts',
  },
  {
    title: 'Kitting',
    phase: 'Materials',
    control: 'Lot-controlled ERP issue',
    detail: 'Parts issued to work orders through our ERP, with lot numbers recorded',
  },
  {
    title: 'PCB assembly',
    phase: 'Build',
    control: 'AOI and functional board test',
    detail: (
      <>
        SMT and through-hole assembly under validated processes, with AOI and functional board
        test
      </>
    ),
  },
  {
    title: 'Sub-assembly',
    phase: 'Build',
    control: 'Controlled sub-assembly',
    detail: 'Pneumatic modules, motor assemblies, garments and harnesses',
  },
  {
    title: 'Final assembly',
    phase: 'Build',
    control: 'Controlled work instructions',
    detail: 'Assembly to controlled work instructions at each station',
  },
  {
    title: 'End-of-line test',
    phase: 'Verify',
    control: 'Functional and electrical safety test',
    detail:
      '100% functional test plus electrical safety (dielectric strength, leakage current, earth continuity)',
  },
  {
    title: 'Burn-in',
    phase: 'Verify',
    control: 'Risk-based load cycle',
    detail: 'Units run under load to catch early failures, where the risk analysis calls for it',
  },
  {
    title: 'Labeling & packaging',
    phase: 'Release',
    control: 'Serial, UDI and pack verification',
    detail: 'Serial and UDI labels, IFU and validated packaging',
  },
  {
    title: 'Final QC & release',
    phase: 'Release',
    control: 'DHR review and quality release',
    detail: 'Device history record reviewed and the lot released by quality',
  },
  {
    title: 'Shipping',
    phase: 'Dispatch',
    control: 'Certificate of conformance',
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
      <div data-production-overview="">
        <div>
          <span data-production-label="">Controlled production route</span>
          <strong>10 recorded stations</strong>
          <p>From received components to quality-released shipment.</p>
        </div>
        <div data-production-phases="" aria-label="Production route phases">
          <span><b>01–02</b> Materials</span>
          <span><b>03–05</b> Build</span>
          <span><b>06–07</b> Verify</span>
          <span><b>08–10</b> Release</span>
        </div>
      </div>

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
            <span data-production-number="">{String(index + 1).padStart(2, '0')}</span>
            <span data-production-tab-copy="">
              <small>{step.phase}</small>
              <strong>{step.title}</strong>
            </span>
          </button>
        ))}
      </div>

      <div data-production-detail="">
        <div data-production-stage-mark="" aria-hidden="true">
          <span>Station</span>
          <strong>{String(activeStep + 1).padStart(2, '0')}</strong>
        </div>
        <div
          id="production-panel"
          role="tabpanel"
          aria-labelledby={`production-tab-${activeStep}`}
          tabIndex={0}
        >
          <span data-production-label="">Active station · {active.phase}</span>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
          <div data-production-control-focus="">
            <span>Control focus</span>
            <strong>{active.control}</strong>
          </div>
        </div>
        <div data-production-controls="">
          <button type="button" onClick={() => selectStep(activeStep - 1)} aria-label="Previous production stage">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12.5 4.5 7 10l5.5 5.5M7.5 10H16" />
            </svg>
          </button>
          <span aria-hidden="true">{String(activeStep + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => selectStep(activeStep + 1)} aria-label="Next production stage">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m7.5 4.5 5.5 5.5-5.5 5.5M4 10h8.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
