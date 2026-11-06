import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import JumpNav from '@/components/ui/JumpNav'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import DeviceFamilyExplorer from '@/components/DeviceFamilyExplorer'
import { DEVICE_FAMILIES } from '@/lib/device-expertise'

export const metadata: Metadata = {
  title: 'Device Expertise | TRONIOUS',
  description:
    'We focus on five device families. That focus means fewer surprises in testing, faster submissions and manufacturing processes already proven on similar products.',
}

const JUMP_LINKS = [
  { href: '#family-explorer', label: 'Device families' },
  { href: '#full-comparison', label: 'Full comparison' },
  { href: '#use-environments', label: 'Use environments' },
]

export default function Expertise() {
  return (
    <>
      <Section tone="band" data-doc="WEB-020">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Device expertise"
            title="Specialists in physical therapy and recovery devices"
            lead="We focus on five device families. That focus means fewer surprises in testing, faster submissions and manufacturing processes already proven on similar products."
          />
          <JumpNav links={JUMP_LINKS} className="mt-8" />
        </Reveal>
      </Section>

      <Section id="family-explorer">
        <Reveal>
          <SectionHead
            eyebrow="Focused experience"
            title="Start with the device family"
            lead="Each family concentrates risk in a different place. Select one to see the engineering focus and the standards that usually shape the first test plan."
          />
        </Reveal>
        <Reveal delay={80}>
          <DeviceFamilyExplorer families={DEVICE_FAMILIES} />
        </Reveal>
      </Section>

      <Section id="full-comparison" tone="sunken" rule>
        <Reveal>
          <SectionHead
            eyebrow="Side-by-side reference"
            title="Full device-family comparison"
            lead="Use this view when comparing product types or preparing an early supplier brief."
          />
          <DataTable className="mt-8">
            <table>
              <thead>
                <tr>
                  <th>Device family</th>
                  <th>Typical engineering challenges</th>
                  <th>Key standards we design to</th>
                </tr>
              </thead>
              <tbody>
                {DEVICE_FAMILIES.map((family) => (
                  <tr key={family.id}>
                    <td>
                      <b>{family.name}</b>
                      <br />
                      {family.examples}
                    </td>
                    <td>{family.challenges}</td>
                    <td>{family.standards.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
          <p data-table-note="">
            Your regulatory team should confirm the standards list for each device. Applicable
            standards depend on intended use and classification.
          </p>
        </Reveal>
      </Section>

      <Section id="use-environments">
        <Reveal>
          <SectionHead
            eyebrow="Use environment"
            title="Clinical and home-use devices need different evidence"
            lead="The same therapy can create different usability, durability and safety requirements depending on who operates the device and where."
          />
        </Reveal>
        <div data-environment-grid="">
          <Reveal>
            <Card className="p-6 sm:p-8">
              <span data-environment-index="">01</span>
              <h3>Clinical devices</h3>
              <p>
                For chiropractors, physical therapists and clinics. Designed for continuous duty,
                cleaning between patients, and professional-use labeling.
              </p>
              <span data-environment-focus="">Focus: duty cycle · cleaning · trained users</span>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="p-6 sm:p-8">
              <span data-environment-index="">02</span>
              <h3>Home-use devices</h3>
              <p>
                For patients and athletes. Designed to IEC 60601-1-11 for the home environment,
                with lay-user usability validation.
              </p>
              <span data-environment-focus="">Focus: lay users · portability · home conditions</span>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="band">
        <Reveal>
          <div data-cta-end="">
            <h2>Bring us the device, use environment and intended market.</h2>
            <p data-hero-lead="">
              We will map the engineering risks, evidence path and manufacturing implications for
              your starting point.
            </p>
            <div data-btns="">
              <Button href="/contact" size="lg">Start a project</Button>
              <Button href="/process" variant="ghost" size="lg">See the development process</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
