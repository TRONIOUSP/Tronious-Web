import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Note from '@/components/ui/Note'
import LegalStructureFigure from '@/components/figures/LegalStructureFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Legal | [Company Name]',
}

export default function Legal() {
  return (
    <>
      <Section tone="band" data-doc="WEB-120">
        <Reveal>
          <SectionHead as="h1" eyebrow="Legal" title="Privacy, terms and cookies" />
          <Note className="mt-6">
            Have your legal counsel write these. Because you target EU buyers, the privacy policy
            must meet GDPR, and the cookie banner must ask consent before non-essential cookies
            load.
          </Note>
        </Reveal>
        <LegalStructureFigure className="mt-8" />
      </Section>

      <Section id="privacy">
        <Reveal>
          <SectionHead
            title="Privacy policy"
            lead="Covers what data the contact form collects, why, how long you keep it, who you share it with, and how people can request deletion. Must cover GDPR (EU), the Australian Privacy Act and applicable US state laws."
          />
        </Reveal>
      </Section>

      <Section id="terms" tone="sunken">
        <Reveal>
          <SectionHead title="Terms of use" lead="Website use terms, disclaimers, and governing law." />
        </Reveal>
      </Section>

      <Section id="cookies">
        <Reveal>
          <SectionHead
            title="Cookie policy"
            lead="List of cookies and analytics tools used, with a consent mechanism."
          />
        </Reveal>
      </Section>

      <Section id="accessibility" tone="sunken">
        <Reveal>
          <SectionHead
            title="Accessibility statement"
            lead="Your commitment to accessible design and a contact for accessibility issues."
          />
        </Reveal>
      </Section>
    </>
  )
}
