import type { Metadata } from 'next'
import EngagementModelsFigure from '@/components/figures/EngagementModelsFigure'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'

export const metadata: Metadata = {
  title: 'Engagement models | TRONIOUS',
  description:
    'Choose the right TRONIOUS engagement model for device design, build-to-print manufacturing, full turnkey development or a customized private-label platform.',
}

const MODELS = [
  {
    letter: 'A',
    title: 'Design only',
    fit: 'For teams with their own manufacturing route',
    description:
      'We design and document the device. You manufacture it or choose another manufacturing partner.',
    scope: 'Product design, engineering and documentation',
    path: 'TRONIOUS designs → your team manufactures',
  },
  {
    letter: 'B',
    title: 'Build to print',
    fit: 'For finished, cleared products moving into production',
    description:
      'You bring a finished, cleared design. We industrialize it and establish the manufacturing route.',
    scope: 'Industrialization and controlled manufacturing',
    path: 'You bring the design → TRONIOUS builds',
  },
  {
    letter: 'C',
    title: 'Full turnkey',
    fit: 'For programs that need one connected delivery partner',
    description:
      'We take the program from concept to cleared device to volume production, under one quality system.',
    scope: 'Concept, development, evidence and production',
    path: 'One partner → one connected program',
  },
  {
    letter: 'D',
    title: 'Platform / private label',
    fit: 'For brands starting from a proven device platform',
    description:
      'Start from our proven device platforms and customize the branding and features for your market.',
    scope: 'Platform configuration and customization',
    path: 'Proven platform → your market offer',
  },
] as const

const DECISIONS = [
  {
    number: '01',
    title: 'What is already complete?',
    copy: 'A concept, working prototype and cleared design each call for a different starting point.',
  },
  {
    number: '02',
    title: 'Where should the handoff happen?',
    copy: 'Decide whether you need a design package, a production partner or one team across both.',
  },
  {
    number: '03',
    title: 'How much should we own?',
    copy: 'The scope can stop at a defined phase or continue through transfer and volume production.',
  },
] as const

export default function Engagement() {
  return (
    <>
      <Section tone="band" data-doc="WEB-060">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Engagement models"
                title="Choose how we work together"
                lead="Start with the support your program needs today. We can own a defined phase, take over manufacturing or connect the full journey from concept to production."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#models" variant="primary" size="lg">
                  Compare the models
                </Button>
                <Button href="/contact" variant="ghost" size="lg">
                  Discuss your project
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div data-hero-figure-frame="">
              <EngagementModelsFigure />
              <p data-hero-figure-caption="">
                Four entry points, shaped around what your team already has and where you need us.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHead eyebrow="A scope that fits" title="Begin at the real starting point" />
          </Reveal>
          <Reveal delay={80}>
            <div data-editorial-intro="">
              <p>
                Some teams need a complete development partner. Others have a finished design and
                need a controlled path into production. The right model starts with an honest view
                of what is already proven.
              </p>
              <p>
                We define the handoff, responsibilities and expected outputs before work begins, so
                both teams know what TRONIOUS owns and what moves back to you.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="models" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Four ways to engage"
            title="Match the model to your program"
            lead="Choose by starting point and desired handoff. The scope can then be tailored to the device, target market and work already completed."
          />
        </Reveal>

        <div data-engagement-card-grid="" className="mt-10 grid gap-6 lg:grid-cols-2">
          {MODELS.map((model, index) => (
            <Reveal key={model.letter} delay={index * 70}>
              <Card className="h-full p-0">
                <article data-engagement-card="">
                  <div data-engagement-card-heading="">
                    <span data-card-index="">Model {model.letter}</span>
                    <div>
                      <h3>{model.title}</h3>
                      <p>{model.fit}</p>
                    </div>
                  </div>
                  <p data-engagement-card-description="">{model.description}</p>
                  <div data-engagement-card-details="">
                    <div>
                      <span>Scope</span>
                      <strong>{model.scope}</strong>
                    </div>
                    <div>
                      <span>Working path</span>
                      <strong>{model.path}</strong>
                    </div>
                  </div>
                </article>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Choosing a model"
              title="Three decisions set the scope"
              lead="You do not need to arrive with the model already selected. These are the questions we use to find the right entry point."
            />
          </Reveal>

          <div data-engagement-decisions="" className="grid gap-4">
            {DECISIONS.map((decision, index) => (
              <Reveal key={decision.number} delay={index * 70}>
                <div data-engagement-decision="">
                  <span data-card-index="">{decision.number}</span>
                  <div>
                    <h3>{decision.title}</h3>
                    <p>{decision.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="accent">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Intellectual property"
              title="Ownership stays clear"
              lead="The client owns all device-specific IP and design files. TRONIOUS retains its pre-existing platform technology and general know-how."
            />
          </Reveal>
          <Reveal delay={80}>
            <Card className="p-6 sm:p-8">
              <span data-eyebrow="">Defined before work begins</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-text-primary">
                Scope, handoff and ownership move together
              </h3>
              <p className="mt-3 text-text-secondary">
                We document the chosen model and its boundaries at the start of the engagement,
                including the work TRONIOUS will deliver and the point at which responsibility
                transfers.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>Defined scope</Badge>
                <Badge>Clear handoff</Badge>
                <Badge>Documented ownership</Badge>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="band">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <SectionHead
              eyebrow="Your starting point"
              title="Bring us the program as it stands today"
              lead="Tell us what is complete, what is uncertain and where you want the handoff to land. We will recommend the engagement model that fits."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/contact" variant="primary" size="lg">
              Start the conversation
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
