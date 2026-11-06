import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import DisciplinesConvergingFigure from '@/components/figures/DisciplinesConvergingFigure'

export const metadata: Metadata = {
  title: 'About | TRONIOUS',
  description:
    'TRONIOUS brings engineering, regulatory, quality and manufacturing together to develop therapy and recovery devices for the US, EU and Australian markets.',
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'Design and evidence move together',
    body: 'Requirements, risk controls and test evidence develop alongside the product, so compliance is built into the design rather than added at the end.',
  },
  {
    number: '02',
    title: 'The handoff is part of the design',
    body: 'Production, test and supplier decisions start early, giving the team a controlled path from prototype to repeatable manufacturing.',
  },
  {
    number: '03',
    title: 'Decisions stay visible',
    body: 'Phase gates make scope, risk, evidence and cost clear before the project moves into its next commitment.',
  },
]

export default function About() {
  return (
    <>
      <Section tone="band" data-doc="WEB-080">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="About TRONIOUS"
                title="One connected team for the whole device journey"
                lead="We bring engineering, regulatory, quality and manufacturing together to develop therapy and recovery devices for the US, EU and Australian markets."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Start a project
                </Button>
                <Button href="/process" variant="ghost" size="lg">
                  See how we work
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-2xl">
              <DisciplinesConvergingFigure className="mx-auto w-full text-text-tertiary" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Why we work this way"
              title="A therapy device is never difficult in only one place"
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="grid gap-5 text-lead leading-[1.65] text-text-secondary">
              <p>
                Mechanics, electronics, firmware, usability, regulatory evidence and production
                all affect one another. A choice made in one discipline can change safety,
                performance, cost or the route to market everywhere else.
              </p>
              <p>
                TRONIOUS keeps those decisions in the same development loop. Safety and compliance
                inform the architecture early, test evidence stays tied to requirements, and
                manufacturing knowledge is present before design transfer begins.
              </p>
              <p>
                The result is a clearer path from the first feasibility question to validated
                production—with fewer gaps between the people who design the device, prove it and
                build it.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="How we operate"
            title="Built for controlled progress"
            lead="The same principles guide the work whether we support one phase or the full journey from concept to production."
          />
        </Reveal>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal as="li" key={principle.number} delay={index * 70} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <span className="font-mono text-sm text-text-tertiary" aria-hidden="true">
                  {principle.number}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-3 text-text-secondary">{principle.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="band">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <SectionHead
              as="h2"
              eyebrow="Work with us"
              title="Bring the whole device into one conversation"
              lead="Tell us where your project stands, or explore opportunities to join the team building what comes next."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button href="/contact" variant="primary">
                Start a project
              </Button>
              <Button href="/careers" variant="ghost">
                View careers
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
