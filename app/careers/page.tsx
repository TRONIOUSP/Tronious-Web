import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Reveal from '@/components/ui/Reveal'
import RoleMapFigure from '@/components/figures/RoleMapFigure'

export const metadata: Metadata = {
  title: 'Careers | TRONIOUS',
  description:
    'Join a multidisciplinary team developing therapy and recovery devices from first concept through validated production.',
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'Own the whole problem',
    body: 'Good decisions connect user needs, engineering, evidence and production. We look beyond the task in front of us.',
  },
  {
    number: '02',
    title: 'Make quality visible',
    body: 'Clear requirements, thoughtful reviews and traceable work are how we move quickly without losing control.',
  },
  {
    number: '03',
    title: 'Build with one another',
    body: 'The strongest devices come from people who share context early, challenge ideas respectfully and finish together.',
  },
]

const DISCIPLINES = [
  {
    team: 'Engineering',
    title: 'Turn clinical needs into reliable systems',
    body: 'Mechanical, electronics, firmware and product engineers work together from architecture through verification.',
    skills: ['Product development', 'Design verification', 'Systems thinking'],
  },
  {
    team: 'Quality & regulatory',
    title: 'Create the evidence behind every decision',
    body: 'Quality and regulatory specialists shape the pathway, risk controls and documentation alongside the design.',
    skills: ['ISO 13485', 'Risk management', 'Market submissions'],
  },
  {
    team: 'Manufacturing',
    title: 'Make good designs repeatable',
    body: 'Production and test teams translate released designs into controlled processes, fixtures and dependable builds.',
    skills: ['Design transfer', 'Process control', 'Production test'],
  },
]

export default function Careers() {
  return (
    <>
      <Section tone="band" data-doc="WEB-110">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Careers"
                title="Build work that helps people move forward"
                lead="Join a multidisciplinary team turning complex therapy-device ideas into safe, manufacturable products."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#opportunities" variant="primary" size="lg">
                  Explore opportunities
                </Button>
                <Button href="/about" variant="ghost" size="lg">
                  Meet TRONIOUS
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div data-hero-figure-frame="">
              <RoleMapFigure />
              <p data-hero-figure-caption="">
                One device journey. Different disciplines. Shared ownership.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            eyebrow="How we work"
            title="Careful work, without the silos"
            lead="Our teams stay close to the product and to one another. You can see how your decisions affect safety, usability, evidence and the people building the device."
          />
        </Reveal>
        <ol data-editorial-card-grid="" className="mt-10">
          {PRINCIPLES.map((principle, index) => (
            <Reveal as="li" key={principle.number} delay={index * 70} className="h-full">
              <Card className="h-full p-6">
                <span data-card-index="">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="opportunities" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Opportunities"
            title="Where you could make an impact"
            lead="Our hiring needs change with the programs moving through development. These are the disciplines we regularly build around."
          />
        </Reveal>
        <div data-opportunity-grid="" className="mt-10">
          {DISCIPLINES.map((discipline, index) => (
            <Reveal key={discipline.team} delay={index * 70} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <span data-eyebrow="">{discipline.team}</span>
                <h3>{discipline.title}</h3>
                <p className="flex-1">{discipline.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {discipline.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
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
              eyebrow="Do your best work here"
              title="Bring your craft—and your curiosity"
              lead="When an active position matches your experience, it will be published here. You can also introduce yourself and tell us where you would add value."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/contact" variant="primary" size="lg">
              Introduce yourself
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
