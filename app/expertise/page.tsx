import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import DeviceComparisonFigure from '@/components/figures/DeviceComparisonFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Device Expertise | TRONIOUS',
  description:
    'We focus on five device families. That focus means fewer surprises in testing, faster submissions and manufacturing processes already proven on similar products.',
}

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
        </Reveal>
      </Section>

      <Section>
        <DeviceComparisonFigure className="mb-8" />
        <Reveal>
          <DataTable>
          <table>
            <thead>
              <tr>
                <th>Device family</th>
                <th>Typical engineering challenges</th>
                <th>Key standards we design to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Spinal traction</b>
                  <br />
                  Cervical and lumbar tables, controllers
                </td>
                <td>
                  Accurate force control and measurement, patient-release and emergency stop,
                  motor safety
                </td>
                <td>IEC 60601-1, IEC 60601-1-2, IEC 62304, ISO 14971</td>
              </tr>
              <tr>
                <td>
                  <b>Knee traction &amp; rehab</b>
                  <br />
                  Distraction, CPM, rehab devices
                </td>
                <td>
                  Range-of-motion limits, joint alignment across patient sizes, repeatable load
                  profiles
                </td>
                <td>IEC 60601-1, IEC 62366-1, ISO 14971</td>
              </tr>
              <tr>
                <td>
                  <b>Pneumatic compression</b>
                  <br />
                  Sequential pumps and garments
                </td>
                <td>
                  Pressure accuracy per chamber, leak detection, over-pressure protection, garment
                  durability
                </td>
                <td>IEC 60601-1, IEC 60601-1-11, ISO 10993 for garments</td>
              </tr>
              <tr>
                <td>
                  <b>Massage &amp; non-pneumatic compression</b>
                  <br />
                  Percussive, vibration, mechanical
                </td>
                <td>
                  Vibration and noise, battery safety, handheld ergonomics, motor life
                </td>
                <td>IEC 60601-1 or IEC 60335 as applicable, IEC 62133-2 for batteries</td>
              </tr>
              <tr>
                <td>
                  <b>Thermal therapy</b>
                  <br />
                  Heat, cold and contrast
                </td>
                <td>
                  Surface temperature limits, independent thermal cut-offs, uniform heating
                </td>
                <td>IEC 80601-2-35, IEC 60601-1-11</td>
              </tr>
              <tr>
                <td>
                  <b>Connected &amp; wearable</b>
                  <br />
                  App-controlled and body-worn versions of the above
                </td>
                <td>
                  Battery life, Bluetooth reliability, cybersecurity, skin-contact materials,
                  comfort
                </td>
                <td>
                  IEC 62304, IEC 81001-5-1, IEC 60601-1-11, ISO 10993 series, radio approvals
                </td>
              </tr>
            </tbody>
          </table>
          </DataTable>
          <p className="mt-4 text-[0.88rem] text-text-tertiary">
            Your RA team should confirm the standards list for each device. Applicable standards
            depend on intended use and classification.
          </p>
        </Reveal>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead as="h2" title="Home-use and clinical devices" />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Clinical devices
              </h3>
              <p className="mt-2 text-text-secondary">
                For chiropractors, physical therapists and clinics. Designed for continuous duty,
                cleaning between patients, and professional-use labeling.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Home-use devices
              </h3>
              <p className="mt-2 text-text-secondary">
                For patients and athletes. Designed to IEC 60601-1-11 for the home environment, with
                lay-user usability validation.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
