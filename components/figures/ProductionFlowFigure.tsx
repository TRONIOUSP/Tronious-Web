import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import Ph from '@/components/ui/Ph'
import Reveal from '@/components/ui/Reveal'

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
  return (
    <ol data-production-flow="" className={cx('ui-pflow', className)}>
      {STEPS.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 40}>
          <b>{step.title}</b>
          <span>{step.detail}</span>
        </Reveal>
      ))}
    </ol>
  )
}
