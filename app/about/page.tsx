import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Ph from '@/components/ui/Ph'
import Reveal from '@/components/ui/Reveal'
import DisciplinesConvergingFigure from '@/components/figures/DisciplinesConvergingFigure'

export const metadata: Metadata = {
  title: 'About | [Company Name]',
  description:
    '[Founded in YYYY], we help medical device brands bring physical therapy and recovery devices to market in the US, EU and Australia.',
}

export default function About() {
  return (
    <>
      <Section tone="band" data-doc="WEB-080">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="About us"
            title="Engineers and regulatory specialists who build therapy devices"
            lead={
              <>
                <Ph>[Founded in YYYY]</Ph>, we help medical device brands bring physical therapy and
                recovery devices to market in the US, EU and Australia.
              </>
            }
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <DisciplinesConvergingFigure className="mx-auto h-auto w-full max-w-xl text-text-tertiary" />
        </Reveal>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead title="Our story" />
          <p className="mt-6 max-w-[68ch] text-text-secondary">
            <Ph wrap>
              [2–3 paragraphs: why the company started, how it grew, what makes you different. Write
              in plain language.]
            </Ph>
          </p>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHead title="Leadership" />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Reveal delay={0}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Chief Executive Officer
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                <Ph>[Name]</Ph>
              </h3>
              <p className="mt-2 text-text-secondary">
                <Ph>[Background and years in medical devices]</Ph>
              </p>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Head of Engineering
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                <Ph>[Name]</Ph>
              </h3>
              <p className="mt-2 text-text-secondary">
                <Ph>[Devices designed, specialties]</Ph>
              </p>
            </Card>
          </Reveal>

          <Reveal delay={160}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Head of Regulatory &amp; Quality
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                <Ph>[Name]</Ph>
              </h3>
              <p className="mt-2 text-text-secondary">
                <Ph>[Submissions led, FDA / MDR / TGA experience]</Ph>
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead title="Join the team" />
          <p className="mt-6 max-w-[68ch] text-text-secondary">
            We hire engineers, quality specialists and production staff.
          </p>
          <Button href="/careers" variant="primary" className="mt-6">
            See open roles
          </Button>
        </Reveal>
      </Section>
    </>
  )
}
