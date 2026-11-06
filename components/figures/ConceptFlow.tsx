import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { key: 'Concept', detail: 'Needs, feasibility and regulatory pathway' },
  { key: 'Design', detail: 'Mechanical, electronics, firmware, pneumatics' },
  { key: 'Test', detail: 'IEC 60601, usability, biocompatibility' },
  { key: 'Submit', detail: '510(k), MDR technical file, TGA' },
  { key: 'Build', detail: 'Pilot runs to volume production' },
]

export default function ConceptFlow({ className }: { className?: string }) {
  return (
    <ol className={className} data-concept-flow="">
      {STEPS.map((step, i) => (
        <Reveal as="li" key={step.key} delay={i * 90}>
          <span data-step-node aria-hidden="true">{i + 1}</span>
          <span data-step-name>{step.key}</span>
          <span data-step-detail>{step.detail}</span>
        </Reveal>
      ))}
    </ol>
  )
}
