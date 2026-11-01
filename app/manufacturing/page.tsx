import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import JumpNav from '@/components/ui/JumpNav'
import Note from '@/components/ui/Note'
import Ph from '@/components/ui/Ph'
import ProductionFlowFigure from '@/components/figures/ProductionFlowFigure'

export const metadata: Metadata = {
  title: 'Manufacturing | [Company Name]',
  description:
    'A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record.',
}

const JUMP_LINKS = [
  { href: '#m-dt', label: 'Design transfer' },
  { href: '#m-flow', label: 'Production flow' },
  { href: '#m-qc', label: 'Quality controls' },
  { href: '#m-scale', label: 'Scaling' },
]

const TRANSFER_STEPS = [
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
        Operators are trained on the work instructions. We build <Ph>[2–3]</Ph> pilot lots,
        inspect them fully and fix any issues found.
      </>
    ),
  },
  {
    title: 'Transfer sign-off',
    detail:
      'You and our quality team approve the transfer. The design is released to production under formal change control.',
  },
]

const QUALITY_CONTROLS = [
  {
    title: 'Full traceability',
    detail: 'Every unit is serialised and linked to its component lots, test results and operators, so any issue can be traced in minutes.',
  },
  {
    title: 'Device history records',
    detail: (
      <>
        Electronic records for every unit and lot, available to you on request or through a
        client portal <Ph>[if offered]</Ph>.
      </>
    ),
  },
  {
    title: 'Process monitoring',
    detail: (
      <>
        Statistical process control on key parameters, with yield and defect data reported to you
        each <Ph>[month]</Ph>.
      </>
    ),
  },
  {
    title: 'Nonconformance & CAPA',
    detail: 'Defects are contained, investigated for root cause and corrected through our CAPA system.',
  },
  {
    title: 'Change control',
    detail: 'No change to parts, suppliers or processes without impact assessment and your written approval.',
  },
  {
    title: 'Complaint support',
    detail: 'We investigate returned units and supply the data you need for complaint handling and regulatory reporting.',
  },
]

export default function Manufacturing() {
  return (
    <>
      <Section tone="band" data-doc="WEB-055">
        <SectionHead
          as="h1"
          eyebrow="Manufacturing"
          title="From released design to thousands of units a month"
          lead="A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record."
        />
        <JumpNav links={JUMP_LINKS} className="mt-8" />
      </Section>

      <Section id="m-dt">
        <SectionHead
          eyebrow="Stage 1"
          title="Design transfer"
          lead="Design transfer turns a verified design into a process that produces the same device every time. Rushing it is the most common cause of production problems and recalls, so we treat it as its own phase with its own gate."
        />
        <ol className="mt-8 grid gap-6">
          {TRANSFER_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                data-numeric=""
                className="font-mono text-eyebrow text-text-tertiary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1 text-text-secondary">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <Note className="mt-8">
          Deliverables: device master record, supplier approvals, first article reports, process
          FMEA, validation protocols and reports, validated test methods, training records and
          pilot build data.
        </Note>
      </Section>

      <Section id="m-flow" tone="sunken">
        <SectionHead eyebrow="Stage 2" title="Volume production flow" lead="The route every unit takes through our facility." />
        <ProductionFlowFigure className="mt-8" />
      </Section>

      <Section id="m-qc">
        <SectionHead eyebrow="Quality controls" title="Built-in quality, every unit" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUALITY_CONTROLS.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-text-secondary">{item.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="m-scale">
        <SectionHead eyebrow="Scaling" title="Grow without changing manufacturer" />
        <DataTable className="mt-8">
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Typical volume</th>
                <th>Setup</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pilot</td>
                <td data-numeric="">
                  <Ph>[Up to 500 units]</Ph>
                </td>
                <td>Flexible cell, engineers on the line, rapid fixes</td>
              </tr>
              <tr>
                <td>Launch</td>
                <td data-numeric="">
                  <Ph>[500–5,000 / year]</Ph>
                </td>
                <td>Dedicated workstations, validated testers</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td data-numeric="">
                  <Ph>[5,000+ / year]</Ph>
                </td>
                <td>Dedicated line, automated test, safety stock agreements</td>
              </tr>
            </tbody>
          </table>
        </DataTable>
        <p className="mt-4 text-text-secondary">
          Already in production elsewhere? We also take over manufacturing of cleared devices from
          other manufacturers. <Link href="/contact">Talk to us about a transfer</Link>.
        </p>
      </Section>
    </>
  )
}
