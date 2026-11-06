import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import TopicMapFigure from '@/components/figures/TopicMapFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Insights | TRONIOUS',
  description:
    'Practical perspectives on medical-device engineering, verification, regulatory strategy and manufacturing transfer.',
}

const TOPICS = [
  {
    eyebrow: 'Regulatory strategy',
    title: '510(k) or De Novo? Framing the pathway before design commitments',
    summary:
      'How intended use, claims, predicates and technological differences shape early development decisions.',
    tags: ['FDA', 'Pathway planning'],
  },
  {
    eyebrow: 'Verification',
    title: 'Planning IEC 60601 evidence for pneumatic compression systems',
    summary:
      'A practical look at test readiness, essential performance and the integration gaps that create late rework.',
    tags: ['IEC 60601', 'Test strategy'],
  },
  {
    eyebrow: 'EU MDR',
    title: 'Technical documentation that stays connected to the design',
    summary:
      'Ways to keep requirements, risk controls, verification and clinical evidence aligned as the device evolves.',
    tags: ['EU MDR', 'Traceability'],
  },
  {
    eyebrow: 'Thermal therapy',
    title: 'Designing heat therapy devices around safety from day one',
    summary:
      'Why temperature control, fault handling, materials and foreseeable use need to be considered as one system.',
    tags: ['80601-2-35', 'Risk control'],
  },
  {
    eyebrow: 'Manufacturing transfer',
    title: 'Moving production without losing process knowledge',
    summary:
      'What to capture before a transfer so suppliers, test methods and acceptance criteria remain controlled.',
    tags: ['Design transfer', 'Supplier quality'],
  },
  {
    eyebrow: 'Australia',
    title: 'Building an ARTG evidence plan from existing approvals',
    summary:
      'How available conformity evidence and device classification affect the route into the Australian market.',
    tags: ['TGA', 'Market access'],
  },
]

export default function Insights() {
  return (
    <>
      <Section tone="band" data-doc="WEB-090">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Insights"
                title="Clarity for the decisions that shape a device"
                lead="Practical perspectives from engineering, quality, regulatory and manufacturing—written for teams moving real products forward."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#topics" variant="primary" size="lg">
                  Browse topics
                </Button>
                <Button href="/contact" variant="ghost" size="lg">
                  Ask a technical question
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div data-hero-figure-frame="">
              <TopicMapFigure />
              <p data-hero-figure-caption="">Guidance across the full device lifecycle.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Our point of view"
              title="Evidence is a design input—not an end-stage deliverable"
            />
          </Reveal>
          <Reveal delay={80}>
            <div data-editorial-intro="">
              <p>
                The most expensive device problems often begin as disconnected decisions: a claim
                without a verification route, a component without a supply strategy, or a risk
                control without a usable test method.
              </p>
              <p>
                Our insights focus on those connections. Each topic is grounded in the work of
                turning requirements into evidence and evidence into a controlled product.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="topics" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="In the library"
            title="Topics we are developing"
            lead="A preview of the practical guides being prepared for device teams. Published articles will appear here as the library grows."
          />
        </Reveal>
        <div data-insight-grid="" className="mt-10">
          {TOPICS.map((topic, index) => (
            <Reveal key={topic.title} delay={index * 55} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <div data-card-meta="">
                  <span data-eyebrow="">{topic.eyebrow}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{topic.title}</h3>
                <p className="flex-1">{topic.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="band">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <SectionHead
              as="h2"
              eyebrow="Need a useful answer now?"
              title="Bring us the decision you are working through"
              lead="Share the device, market and development stage. We will help frame the next technical or regulatory question."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/contact" variant="primary" size="lg">
              Talk to the team
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
