import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Ph from '@/components/ui/Ph'
import CaseStudyFigure from '@/components/figures/CaseStudyFigure'

export const metadata: Metadata = {
  title: 'Case studies | [Company Name]',
  description:
    'Client names are shared only with permission. The examples below are templates: replace them with your real projects.',
}

export default function Cases() {
  return (
    <>
      <Section tone="band" data-doc="WEB-070">
        <SectionHead
          as="h1"
          eyebrow="Case studies"
          title="Projects we've delivered"
          lead="Client names are shared only with permission. The examples below are templates: replace them with your real projects."
        />
      </Section>

      <Section>
        <CaseStudyFigure className="mb-10" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <span
              data-eyebrow=""
              className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
            >
              Pneumatic compression · Full turnkey
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
              Sequential compression system for a US sports-recovery brand
            </h3>
            <p className="mt-4 text-text-secondary">
              <b>Challenge:</b> <Ph>[What the client needed]</Ph>
            </p>
            <p className="mt-2 text-text-secondary">
              <b>Approach:</b> <Ph>[What you did]</Ph>
            </p>
            <dl data-case-facts="" className="mt-6">
              <div>
                <dt>Timeline</dt>
                <dd>
                  <Ph>[X] mo</Ph>
                </dd>
              </div>
              <div>
                <dt>Clearance</dt>
                <dd>510(k)</dd>
              </div>
              <div>
                <dt>Volume</dt>
                <dd>
                  <Ph>[X]/mo</Ph>
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="p-6">
            <span
              data-eyebrow=""
              className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
            >
              Spinal traction · Build to print
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
              Lumbar traction table transferred from an EU manufacturer
            </h3>
            <p className="mt-4 text-text-secondary">
              <b>Challenge:</b> <Ph>[What the client needed]</Ph>
            </p>
            <p className="mt-2 text-text-secondary">
              <b>Approach:</b> <Ph>[What you did]</Ph>
            </p>
            <dl data-case-facts="" className="mt-6">
              <div>
                <dt>Timeline</dt>
                <dd>
                  <Ph>[X] mo</Ph>
                </dd>
              </div>
              <div>
                <dt>Market</dt>
                <dd>EU MDR</dd>
              </div>
              <div>
                <dt>Cost saved</dt>
                <dd>
                  <Ph>[X]%</Ph>
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="p-6">
            <span
              data-eyebrow=""
              className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
            >
              Thermal therapy · Design only
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
              Home-use heat therapy wrap for an Australian brand
            </h3>
            <p className="mt-4 text-text-secondary">
              <b>Challenge:</b> <Ph>[What the client needed]</Ph>
            </p>
            <p className="mt-2 text-text-secondary">
              <b>Approach:</b> <Ph>[What you did]</Ph>
            </p>
            <dl data-case-facts="" className="mt-6">
              <div>
                <dt>Timeline</dt>
                <dd>
                  <Ph>[X] mo</Ph>
                </dd>
              </div>
              <div>
                <dt>Market</dt>
                <dd>TGA</dd>
              </div>
              <div>
                <dt>Standard</dt>
                <dd>80601-2-35</dd>
              </div>
            </dl>
          </Card>
        </div>
      </Section>
    </>
  )
}
