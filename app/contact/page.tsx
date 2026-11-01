import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Ph from '@/components/ui/Ph'
import ContactForm from '@/components/ContactForm'
import RFQFlowFigure from '@/components/figures/RFQFlowFigure'

export const metadata: Metadata = {
  title: 'Start a Project | [Company Name]',
  description:
    "We reply within [2] business days. We sign an NDA before any detailed technical discussion. Please don't include confidential drawings in this form.",
}

export default function Contact() {
  return (
    <>
      <Section tone="band" data-doc="WEB-100">
        <SectionHead
          as="h1"
          eyebrow="Start a project"
          title="Tell us about your device"
          lead={
            <>
              We reply within <Ph>[2]</Ph> business days. We sign an NDA before any detailed
              technical discussion. Please don&apos;t include confidential drawings in this form.
            </>
          }
        />
      </Section>

      <Section>
        <RFQFlowFigure />
        <div className="mt-8">
          <ContactForm />
        </div>
      </Section>

      <Section tone="sunken">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="p-6">
            <span
              data-eyebrow=""
              className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
            >
              Business development
            </span>
            <p className="mt-3 text-text-secondary">
              <Ph>[email@company.com]</Ph>
              <br />
              <Ph>[+00 000 000 0000]</Ph>
            </p>
          </Card>
          <Card className="p-6">
            <span
              data-eyebrow=""
              className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
            >
              Facility address
            </span>
            <p className="mt-3 text-text-secondary">
              <Ph>[Street, City, Postcode, Country]</Ph>
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}
