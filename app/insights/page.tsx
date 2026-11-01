import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import TopicMapFigure from '@/components/figures/TopicMapFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Insights | [Company Name]',
  description:
    'Practical articles that show your expertise and bring in buyers through search. Suggested first articles:',
}

const TOPICS = [
  {
    eyebrow: 'Regulatory',
    title: '510(k) or De Novo? Choosing a pathway for a new traction device',
  },
  {
    eyebrow: 'Testing',
    title: 'IEC 60601 testing for pneumatic compression devices: common failures',
  },
  {
    eyebrow: 'EU MDR',
    title: 'Technical documentation pitfalls for physical therapy devices',
  },
  {
    eyebrow: 'Design',
    title: 'Designing heat therapy devices to IEC 80601-2-35',
  },
  {
    eyebrow: 'Manufacturing',
    title: 'Moving production to a new contract manufacturer without re-clearance',
  },
  {
    eyebrow: 'Australia',
    title: 'Getting a device onto the ARTG using MDSAP evidence',
  },
]

export default function Insights() {
  return (
    <>
      <Section tone="band" data-doc="WEB-090">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Insights"
            title="Guides for device brands"
            lead="Practical articles that show your expertise and bring in buyers through search. Suggested first articles:"
          />
        </Reveal>
      </Section>

      <Section>
        <TopicMapFigure />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 60}>
              <Card className="p-6">
                <span
                  data-eyebrow=""
                  className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
                >
                  {topic.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                  {topic.title}
                </h3>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
