import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Reveal from '@/components/ui/Reveal'
import CaseStudyFigure from '@/components/figures/CaseStudyFigure'

export const metadata: Metadata = {
  title: 'Case studies | TRONIOUS',
  description:
    'Representative pathways showing how TRONIOUS connects engineering, evidence and production for therapy-device programs.',
}

const PATHWAYS = [
  {
    number: '01',
    category: 'Pneumatic compression · Full turnkey',
    title: 'From product concept to a submission-ready compression system',
    challenge:
      'A brand needs to translate a differentiated therapy concept into a safe architecture, a credible evidence plan and a device that can be built repeatedly.',
    response:
      'Align intended use, system requirements and risk controls; develop the pneumatic, electronic and software architecture; then carry the design through verification and transfer.',
    outcomes: ['Integrated device architecture', 'Verification evidence', 'Controlled production package'],
    route: 'Concept → verification → production',
  },
  {
    number: '02',
    category: 'Spinal traction · Manufacturing transfer',
    title: 'Moving an established device into a controlled new supply chain',
    challenge:
      'A cleared or mature product needs a new manufacturing route without losing design intent, supplier knowledge or confidence in final acceptance testing.',
    response:
      'Baseline the released design, close documentation gaps, qualify suppliers and fixtures, and validate the processes that determine safety and performance.',
    outcomes: ['Transfer gap assessment', 'Qualified supply chain', 'Repeatable release testing'],
    route: 'Baseline → qualify → validate',
  },
  {
    number: '03',
    category: 'Thermal therapy · Design & verification',
    title: 'Building safety and usability into a home-use therapy device',
    challenge:
      'A wearable thermal concept must control temperature reliably while remaining intuitive, comfortable and robust under foreseeable home-use conditions.',
    response:
      'Develop the thermal control strategy alongside materials, ergonomics, fault handling and the verification methods needed to prove essential performance.',
    outcomes: ['Risk-led control strategy', 'Usability-informed design', 'Testable essential performance'],
    route: 'Risk → design → evidence',
  },
]

export default function Cases() {
  return (
    <>
      <Section tone="band" data-doc="WEB-070">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Case studies"
                title="See how complex device programs move forward"
                lead="Representative engagement pathways showing how we connect the product, its evidence and the system that will build it."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#pathways" variant="primary" size="lg">
                  Explore the pathways
                </Button>
                <Button href="/process" variant="ghost" size="lg">
                  See our process
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div data-hero-figure-frame="">
              <CaseStudyFigure />
              <p data-hero-figure-caption="">
                Every engagement is framed around the decision, the work and the evidence.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="A connected delivery model"
              title="The handoffs are where programs win or lose"
            />
          </Reveal>
          <Reveal delay={80}>
            <div data-editorial-intro="">
              <p>
                A prototype is not yet a product, and a released design is not yet a stable
                production process. Progress depends on the quality of the decisions between those
                milestones.
              </p>
              <p>
                These representative pathways show where TRONIOUS can take ownership, what that
                work connects, and the practical outputs a device team should expect.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="pathways" tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Representative pathways"
            title="Three ways we can enter the program"
            lead="The examples below describe common engagement patterns rather than named client projects. Scope and evidence are tailored to the device, market and starting point."
          />
        </Reveal>

        <div data-case-pathway-list="" className="mt-10">
          {PATHWAYS.map((pathway, index) => (
            <Reveal key={pathway.number} delay={index * 70}>
              <Card className="p-0">
                <article data-case-pathway="">
                  <div data-case-pathway-heading="">
                    <span data-card-index="">{pathway.number}</span>
                    <div>
                      <span data-eyebrow="">{pathway.category}</span>
                      <h3>{pathway.title}</h3>
                    </div>
                  </div>
                  <div data-case-pathway-copy="">
                    <div>
                      <strong>Challenge</strong>
                      <p>{pathway.challenge}</p>
                    </div>
                    <div>
                      <strong>Response</strong>
                      <p>{pathway.response}</p>
                    </div>
                  </div>
                  <div data-case-pathway-footer="">
                    <div className="flex flex-wrap gap-2">
                      {pathway.outcomes.map((outcome) => (
                        <Badge key={outcome}>{outcome}</Badge>
                      ))}
                    </div>
                    <span>{pathway.route}</span>
                  </div>
                </article>
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
              eyebrow="Your program"
              title="Start with the handoff that needs to work"
              lead="Tell us what is already proven, what remains uncertain and where the program needs to go next."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/contact" variant="primary" size="lg">
              Discuss your project
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
