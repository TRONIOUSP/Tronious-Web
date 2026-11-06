import type { Metadata } from 'next'
import manufacturingImage from '@/public/images/precision-assembly.png'
import ManufacturingTransfer from '@/components/ManufacturingTransfer'
import ProductionFlowFigure from '@/components/figures/ProductionFlowFigure'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import JumpNav from '@/components/ui/JumpNav'
import MediaPanel from '@/components/ui/MediaPanel'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'

export const metadata: Metadata = {
  title: 'Manufacturing | TRONIOUS',
  description:
    'A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record.',
}

const JUMP_LINKS = [
  { href: '#m-dt', label: 'Design transfer' },
  { href: '#m-flow', label: 'Production flow' },
  { href: '#m-qc', label: 'Quality controls' },
  { href: '#m-scale', label: 'Scaling' },
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
        Electronic records for every unit and lot, available to you on request.
      </>
    ),
  },
  {
    title: 'Process monitoring',
    detail: (
      <>
        Statistical process control on key parameters, with yield and defect data reported to you
        on an agreed schedule.
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

const SCALE_STAGES = [
  {
    title: 'Pilot',
    action: 'Prove',
    profile: 'Pilot lots',
    setup: ['Flexible cell', 'Engineers on the line', 'Rapid fixes'],
  },
  {
    title: 'Launch',
    action: 'Stabilise',
    profile: 'Commercial launch',
    setup: ['Dedicated workstations', 'Validated testers'],
  },
  {
    title: 'Volume',
    action: 'Scale',
    profile: 'Sustained demand',
    setup: ['Dedicated line', 'Automated test', 'Safety-stock agreements'],
  },
]

export default function Manufacturing() {
  return (
    <>
      <Section tone="band" data-doc="WEB-055">
        <div data-page-hero-layout="">
          <Reveal>
            <SectionHead
              as="h1"
              eyebrow="Manufacturing"
              title="From released design to thousands of units a month"
              lead="A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record."
            />
            <JumpNav links={JUMP_LINKS} className="mt-8" />
          </Reveal>
          <Reveal delay={100}>
            <MediaPanel
              src={manufacturingImage}
              alt="Illustrative precision assembly and validation of an electronic therapy controller"
              eyebrow="Controlled production"
              caption="Assembly, inspection and functional validation at every release gate"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section id="m-dt">
        <div data-manufacturing-intro="">
          <Reveal>
            <SectionHead
              eyebrow="Stage 1"
              title="Design transfer"
              lead="Design transfer turns a verified design into a process that produces the same device every time. Rushing it is the most common cause of production problems and recalls, so we treat it as its own phase with its own gate."
            />
          </Reveal>
          <Reveal delay={80}>
            <div data-manufacturing-deliverables="">
              <span>Transfer output</span>
              <p>
                Device master record, supplier approvals, first article reports, process FMEA,
                validation protocols and reports, validated test methods, training records and pilot
                build data.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <ManufacturingTransfer />
        </Reveal>
      </Section>

      <Section id="m-flow" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Stage 2"
            title="Volume production flow"
            lead="Explore the route every unit takes through our facility, from incoming inspection to shipment."
          />
        </Reveal>
        <Reveal>
          <ProductionFlowFigure className="mt-8" />
        </Reveal>
      </Section>

      <Section id="m-qc">
        <Reveal>
          <SectionHead
            eyebrow="Quality controls"
            title="Built-in quality, every unit"
            lead="Each control creates an inspectable record, so production history stays connected from component receipt through field support."
          />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUALITY_CONTROLS.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <div data-control-card-head="">
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>Controlled</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 flex-1 text-text-secondary">{item.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="m-scale" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Scaling"
            title="Grow without changing manufacturer"
            lead="The production setup evolves with demand while the controlled record, test strategy and quality oversight stay connected."
          />
        </Reveal>
        <ol data-scaling-path="">
          {SCALE_STAGES.map((stage, index) => (
            <Reveal as="li" key={stage.title} delay={index * 80}>
              <span data-scaling-number="">{String(index + 1).padStart(2, '0')}</span>
              <Card className="h-full p-6">
                <div data-scaling-card-head="">
                  <span>Stage {String(index + 1).padStart(2, '0')}</span>
                  <span>{stage.action}</span>
                </div>
                <h3>{stage.title}</h3>
                <div data-scaling-profile="">
                  <span data-scaling-label="">Volume profile</span>
                  <strong>{stage.profile}</strong>
                </div>
                <div data-scaling-setup="">
                  <span data-scaling-label="">Production setup</span>
                  <ul>
                    {stage.setup.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div data-scaling-continuity="">
            <span>Connected at every stage</span>
            <ul>
              <li>Controlled records</li>
              <li>Validated test strategy</li>
              <li>Quality oversight</li>
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <div data-scale-cta="">
            <div>
              <span data-scale-cta-label="">Manufacturing transfer</span>
              <p>
                <strong>Already in production elsewhere?</strong>
                We also take over manufacturing of cleared devices from other manufacturers.
              </p>
            </div>
            <Button href="/contact" variant="primary">Talk to us about a transfer</Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
