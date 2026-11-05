import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TickList from '@/components/ui/TickList'
import ServiceAreaIcon from '@/components/figures/ServiceAreaIcon'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Services | TRONIOUS',
  description:
    "Use us for a single phase or the full journey. Each service runs under our ISO 13485 quality system, so documentation transfers cleanly into your design history file.",
}

const SERVICE_AREAS = [
  {
    area: 'design' as const,
    eyebrow: '01 · Design',
    title: 'Product design & engineering',
    ticks: [
      'Industrial design and human factors',
      'Mechanical and pneumatic systems',
      'Electronics and power design',
      'Embedded firmware to IEC 62304',
      'Mobile apps and wearable devices',
      'Test equipment and production fixtures',
    ],
    more: { href: '/engineering', label: 'Engineering details →' },
  },
  {
    area: 'regulatory' as const,
    eyebrow: '02 · Regulatory',
    title: 'Regulatory strategy & submissions',
    ticks: [
      'Classification and pathway strategy',
      'FDA 510(k) preparation',
      'EU MDR technical documentation',
      'TGA / ARTG support',
      'Labeling and IFU development',
    ],
  },
  {
    area: 'testing' as const,
    eyebrow: '03 · Testing',
    title: 'Verification & validation',
    ticks: [
      'IEC 60601-1, -1-2, -1-11 test planning',
      'Test lab coordination and pre-compliance',
      'Usability engineering to IEC 62366-1',
      'Biocompatibility to ISO 10993',
      'Software verification',
    ],
  },
  {
    area: 'manufacturing' as const,
    eyebrow: '04 · Manufacturing',
    title: 'Production',
    ticks: [
      'Prototypes and pilot builds',
      'Design transfer and process validation',
      'Volume assembly and test',
      'Device history records per unit',
    ],
    more: { href: '/manufacturing', label: 'Manufacturing details →' },
  },
  {
    area: 'supply' as const,
    eyebrow: '05 · Supply chain',
    title: 'Supply chain, packaging & labeling',
    ticks: [
      'Supplier qualification and audits',
      'UDI labeling for US and EU',
      'Packaging design and validation',
      'Direct shipment to your distributors',
    ],
  },
  {
    area: 'postmarket' as const,
    eyebrow: '06 · Post-market',
    title: 'Sustaining engineering',
    ticks: [
      'Complaint investigation support',
      'CAPA and design changes',
      'Component obsolescence management',
      'Cost-down redesigns',
    ],
  },
]

export default function Services() {
  return (
    <>
      <Section tone="band" data-doc="WEB-010">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Services"
            title="Every stage, under one quality system"
            lead="Use us for a single phase or the full journey. Each service runs under our ISO 13485 quality system, so documentation transfers cleanly into your design history file."
          />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map(({ area, eyebrow, title, ticks, more }, i) => (
            <Reveal key={area} delay={i * 50} className="h-full">
              <Card className="flex h-full flex-col gap-4 p-6">
                <ServiceAreaIcon area={area} className="h-10 w-10 text-text-tertiary" />
                <span
                  data-eyebrow=""
                  className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
                >
                  {eyebrow}
                </span>
                <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
                <TickList items={ticks} className="flex-1" />
                {more ? (
                  <Link href={more.href} data-more-link="">
                    {more.label}
                  </Link>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <SectionHead
              as="h2"
              title="Not sure where to start?"
              lead="Most clients arrive with either a concept, a prototype, or a cleared design that needs a new manufacturer. We'll recommend the right starting point after one call."
            />
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Book a scoping call
              </Button>
              <Button href="/engagement" variant="ghost">
                Engagement models
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
