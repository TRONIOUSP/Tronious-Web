import type { Metadata } from 'next'
import projectScopingImage from '@/public/images/project-scoping-meeting.png'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TickList from '@/components/ui/TickList'
import Note from '@/components/ui/Note'
import MediaPanel from '@/components/ui/MediaPanel'
import ContactForm from '@/components/ContactForm'
import RFQFlowFigure from '@/components/figures/RFQFlowFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Start a Project | TRONIOUS',
  description:
    'Tell TRONIOUS about your therapy-device concept, development stage, target markets and the support your team needs.',
}

const BRIEF_POINTS = [
  'What the device does and who will use it',
  'Your current development or production stage',
  'The markets and launch timing you are considering',
  'Where you need engineering, regulatory or manufacturing support',
]

export default function Contact() {
  return (
    <>
      <Section tone="band" data-doc="WEB-100">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Start a project"
                title="Bring the whole device into the conversation"
                lead="Tell us where the program stands, what still needs to be proven and where you need the right team around the table."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#project-inquiry" variant="primary" size="lg">
                  Start your inquiry
                </Button>
                <Button href="/services" variant="ghost" size="lg">
                  Explore our services
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <MediaPanel
              src={projectScopingImage}
              alt="Two engineers reviewing a therapy-device prototype and technical drawing at a workbench"
              eyebrow="Technical scoping"
              caption="Start with the product, the evidence and the handoff that needs to work"
              priority
              className="min-h-[24rem]"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="project-inquiry">
        <Reveal>
          <SectionHead
            eyebrow="Project inquiry"
            title="Give us the useful starting point"
            lead="A concise brief is enough. We will use it to understand the device, identify the right disciplines and frame a productive first discussion."
          />
        </Reveal>

        <Reveal delay={60}>
          <RFQFlowFigure className="mt-10" />
        </Reveal>

        <div data-contact-layout="" className="mt-10">
          <Reveal>
            <Card className="p-0">
              <div data-contact-form-heading="">
                <span data-card-index="">01</span>
                <div>
                  <span data-eyebrow="">Your project brief</span>
                  <h2>Start the conversation</h2>
                  <p>Share only what is appropriate before an NDA is in place.</p>
                </div>
              </div>
              <div data-contact-form-body="">
                <ContactForm />
              </div>
            </Card>
          </Reveal>

          <aside data-contact-aside="" aria-label="Inquiry guidance">
            <Reveal delay={80}>
              <Card className="p-6">
                <span data-eyebrow="">A useful brief includes</span>
                <h3>Enough context to find the right starting point</h3>
                <TickList items={BRIEF_POINTS} className="mt-5" />
              </Card>
            </Reveal>

            <Reveal delay={140}>
              <Card className="p-6">
                <span data-eyebrow="">Confidentiality</span>
                <h3>Keep detailed IP out of the first message</h3>
                <p>
                  Do not include confidential drawings, source files, patient information or
                  sensitive technical details. Request a mutual NDA in the form before sharing
                  protected material.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={180}>
              <Note>
                Not sure which service you need? Describe the current constraint rather than trying
                to define the solution—we will help frame the next step.
              </Note>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <div data-contact-closing="">
            <SectionHead
              eyebrow="What happens next"
              title="A focused first conversation"
              lead="We review the brief, bring in the disciplines it needs and use the first call to clarify scope, evidence, interfaces and the most useful next commitment."
            />
            <Button href="#project-inquiry" variant="subtle">
              Return to the form
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
