import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import TickList from '@/components/ui/TickList'
import Note from '@/components/ui/Note'
import ProcessGateFlow from '@/components/figures/ProcessGateFlow'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Process | TRONIOUS',
  description:
    'Six phases, each closed by a gate review that you approve. Nothing moves forward on assumptions, and every phase produces documentation that goes straight into your design history file.',
}

const GATES = [
  {
    title: 'Concept & feasibility',
    duration: 'Typically 4–8 weeks',
    lead: 'We work out what the device must do, who uses it, and whether it can be built and cleared at your target cost.',
    ticks: [
      'User needs and intended use statement',
      'Device classification and regulatory pathway for US, EU and Australia, including predicate search for a 510(k)',
      'Competitor and patent landscape review',
      'Proof-of-concept prototypes for the riskiest functions',
      'Target cost, budget and timeline',
    ],
    deliverables: 'Gate 1 deliverables: feasibility report, regulatory strategy, project plan and quote',
  },
  {
    title: 'Design inputs & planning',
    duration: 'Typically 3–6 weeks',
    lead: 'User needs become measurable engineering requirements, and the risk management file starts.',
    ticks: [
      'System, hardware, firmware and app requirements',
      'Risk management plan and initial hazard analysis to ISO 14971',
      'Applicable standards list and test plan outline',
      'Usability plan and user profiles to IEC 62366-1',
    ],
    deliverables: 'Gate 2 deliverables: design and development plan, requirements specifications, risk management plan',
  },
  {
    title: 'Detailed design',
    duration: 'Typically 3–9 months',
    lead: 'Mechanical, electronics, firmware and app engineering run in parallel, in short build-and-test iterations.',
    ticks: [
      'Two or three prototype rounds, from works-like to looks-like to production-intent',
      'Design reviews at each iteration, with independent reviewers',
      'EMC and electrical safety pre-compliance testing on prototypes',
      'Formative usability studies with real clinicians or users',
      'Design FMEA and updated risk analysis',
      'Supplier selection and tooling for moulded parts',
    ],
    deliverables: 'Gate 3 deliverables: frozen design, drawings, BOM, firmware release candidate, design review records',
  },
  {
    title: 'Verification & validation',
    duration: 'Typically 2–4 months',
    lead: (
      <>We prove the design meets every requirement (verification) and meets users&apos; needs (validation).</>
    ),
    ticks: [
      'Third-party IEC 60601-1, 60601-1-2 and collateral standard testing at an accredited lab',
      'Performance and endurance testing on our in-house rigs',
      'Software verification and cybersecurity testing',
      'Biocompatibility evaluation for patient-contact materials',
      'Summative usability validation',
      'Packaging and transit testing',
    ],
    deliverables: 'Gate 4 deliverables: test reports, traceability matrix, risk management report, usability engineering file',
  },
  {
    title: 'Regulatory submission',
    duration: 'Review times set by each regulator',
    lead: "We prepare the submission content. Your company, as legal manufacturer, submits to the FDA, your notified body and the TGA, and we support you through questions.",
    ticks: [
      '510(k) content, with FDA eSTAR formatting',
      'EU MDR technical documentation and GSPR checklist',
      <>Support for your Australian sponsor&apos;s ARTG application</>,
      'Labeling, IFU and UDI data',
      'Responses to regulator questions and deficiency letters',
    ],
    deliverables: 'Gate 5 deliverables: submission-ready documentation, labeling set',
  },
  {
    title: 'Design transfer & production',
    duration: 'Typically 2–3 months',
    lead: 'The verified design becomes a validated production process, then scales to volume.',
    ticks: [
      'Device master record, supplier approvals and first article inspection',
      'Process validation and test method validation',
      'Pilot lots, then ramp to volume production',
    ],
    deliverables: (
      <>
        Gate 6 deliverables: validated processes, first production lot.{' '}
        <Link href="/manufacturing">Full manufacturing details →</Link>
      </>
    ),
  },
]

export default function Process() {
  return (
    <>
      <Section tone="band" data-doc="WEB-030">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Development process"
            title="Phase-gated, with a deliverable at every gate"
            lead="Six phases, each closed by a gate review that you approve. Nothing moves forward on assumptions, and every phase produces documentation that goes straight into your design history file."
          />
        </Reveal>
        <ProcessGateFlow className="mt-8" />
      </Section>

      <Section>
        <ol className="grid gap-6">
          {GATES.map((gate, index) => (
            <Reveal key={gate.title} delay={index * 70}>
              <li>
                <Card className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="flex items-baseline gap-2 font-display text-lg font-semibold text-text-primary">
                      <span aria-hidden="true" className="font-mono text-text-tertiary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {gate.title}
                    </h3>
                    <span className="font-mono text-eyebrow text-text-tertiary">{gate.duration}</span>
                  </div>
                  <p className="mt-2 text-text-secondary">{gate.lead}</p>
                  <TickList items={gate.ticks} className="mt-4" />
                  <p className="mt-4 font-mono text-sm text-text-tertiary">{gate.deliverables}</p>
                </Card>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <Note>
            Our quality system follows ISO 13485:2016 and FDA&apos;s Quality Management System
            Regulation (QMSR, 21 CFR 820), which took effect in February 2026. Timelines are typical
            ranges and depend on device complexity and classification.
          </Note>
        </Reveal>
      </Section>
    </>
  )
}
