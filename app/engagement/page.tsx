import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Ph from '@/components/ui/Ph'
import EngagementModelsFigure from '@/components/figures/EngagementModelsFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Engagement models | [Company Name]',
}

export default function Engagement() {
  return (
    <>
      <Section tone="band" data-doc="WEB-060">
        <Reveal>
          <SectionHead as="h1" eyebrow="Engagement models" title="Choose how we work together" />
        </Reveal>
      </Section>

      <Section>
        <EngagementModelsFigure />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Reveal delay={0}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Model A
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                Design only
              </h3>
              <p className="mt-2 text-text-secondary">
                We design and document the device. You manufacture or choose another manufacturer.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={70}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Model B
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                Build to print
              </h3>
              <p className="mt-2 text-text-secondary">
                You bring a finished, cleared design. We industrialize and manufacture it.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={140}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Model C
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                Full turnkey
              </h3>
              <p className="mt-2 text-text-secondary">
                Concept to cleared device to volume production, with one partner and one quality
                system.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={210}>
            <Card className="p-6">
              <span
                data-eyebrow=""
                className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
              >
                Model D
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                Platform / private label
              </h3>
              <p className="mt-2 text-text-secondary">
                Start from our proven device platforms and customize branding and features.{' '}
                <Ph>[Remove if not offered]</Ph>
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead title="Intellectual property" />
          <p className="mt-6 max-w-[68ch] text-text-secondary">
            Every client asks who owns the design. State your standard position clearly here, for
            example:{' '}
            <Ph wrap>
              [Client owns all device-specific IP and design files; we retain our pre-existing
              platform technology and general know-how.]
            </Ph>{' '}
            Have your legal team approve this wording.
          </p>
        </Reveal>
      </Section>
    </>
  )
}
