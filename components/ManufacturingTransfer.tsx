'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

const STEPS: { title: string; detail: ReactNode }[] = [
  {
    title: 'Production readiness review',
    detail:
      'Engineering, quality and production confirm the design is complete, verified and manufacturable. Open design issues are closed or formally accepted.',
  },
  {
    title: 'Device master record',
    detail:
      'We compile the full production recipe: drawings, BOM, specifications, work instructions, test procedures, labeling and packaging.',
  },
  {
    title: 'Supplier qualification',
    detail:
      'Critical suppliers are audited and approved. First article inspection confirms every new part matches its drawing.',
  },
  {
    title: 'Process risk analysis',
    detail: 'A process FMEA identifies where assembly could go wrong and defines the controls that prevent it.',
  },
  {
    title: 'Process validation',
    detail: (
      <>
        Processes whose results can&apos;t be fully checked afterwards (RF welding, soldering,
        adhesive bonding, ultrasonic welding) are validated through installation, operational and
        performance qualification (IQ / OQ / PQ).
      </>
    ),
  },
  {
    title: 'Test method validation',
    detail: 'Production testers and fixtures are validated, so a pass truly means the unit is good.',
  },
  {
    title: 'Training and pilot builds',
    detail: (
      <>
        Operators are trained on the work instructions. We build pilot lots, inspect them fully
        and fix any issues found.
      </>
    ),
  },
  {
    title: 'Transfer sign-off',
    detail:
      'You and our quality team approve the transfer. The design is released to production under formal change control.',
  },
]

export default function ManufacturingTransfer() {
  const [activeStep, setActiveStep] = useState(0)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  function selectStep(index: number) {
    const next = (index + STEPS.length) % STEPS.length
    setActiveStep(next)
    tabsRef.current[next]?.focus()
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectStep(index + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      selectStep(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectStep(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectStep(STEPS.length - 1)
    }
  }

  const active = STEPS[activeStep]

  return (
    <div data-transfer-explorer="">
      <div data-transfer-tabs="" role="tablist" aria-label="Design transfer steps">
        {STEPS.map((step, index) => (
          <button
            ref={(element) => { tabsRef.current[index] = element }}
            key={step.title}
            id={`transfer-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === activeStep}
            aria-controls="transfer-panel"
            tabIndex={index === activeStep ? 0 : -1}
            onClick={() => setActiveStep(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.title}</strong>
          </button>
        ))}
      </div>

      <div
        id="transfer-panel"
        data-transfer-panel=""
        role="tabpanel"
        aria-labelledby={`transfer-tab-${activeStep}`}
        tabIndex={0}
      >
        <span data-transfer-kicker="">Active transfer gate</span>
        <span data-transfer-count="" aria-hidden="true">
          {String(activeStep + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </span>
        <h3>{active.title}</h3>
        <p>{active.detail}</p>
        <div data-transfer-progress="" aria-hidden="true">
          <span style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
