import type { Metadata } from 'next'
import manufacturingImage from '@/public/images/precision-assembly.png'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import TickList from '@/components/ui/TickList'
import DataTable from '@/components/ui/DataTable'
import FacilitySchematic from '@/components/figures/FacilitySchematic'
import Reveal from '@/components/ui/Reveal'
import MediaPanel from '@/components/ui/MediaPanel'

export const metadata: Metadata = {
  title: 'Facilities | TRONIOUS',
  description:
    'Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image.',
}

export default function Facilities() {
  return (
    <>
      <Section tone="band" data-doc="WEB-050">
        <div data-page-hero-layout="">
          <Reveal>
            <SectionHead
              as="h1"
              eyebrow="Facilities & capabilities"
              title="Where your device gets built"
              lead="Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image."
            />
          </Reveal>
          <Reveal delay={100}>
            <MediaPanel
              src={manufacturingImage}
              alt="Illustrative electronics assembly and validation workcell"
              eyebrow="Production environment"
              caption="A visual placeholder for your real facility photography"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <FacilitySchematic />
        <Reveal>
          <DataTable className="mt-8">
            <table style={{ minWidth: 0 }}>
              <tbody>
                <tr>
                  <td>Production lines</td>
                  <td>Configured to each project&apos;s volume and process route</td>
                </tr>
                <tr>
                  <td>Controlled environments</td>
                  <td>ESD-protected assembly and test areas</td>
                </tr>
                <tr>
                  <td>Annual capacity</td>
                  <td>Scaled to each program, from pilot lots to volume production</td>
                </tr>
                <tr>
                  <td>Engineering team</td>
                  <td>Mechanical, electronics, firmware, quality and regulatory engineers working as one team</td>
                </tr>
              </tbody>
            </table>
          </DataTable>
        </Reveal>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead title="In-house equipment" />
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Reveal>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Test &amp; measurement
              </h3>
              <TickList
                className="mt-4"
                items={[
                  'Electrical safety and hipot testers',
                  'Pressure and flow calibration',
                  'Thermal chambers and data loggers',
                  'Force and load testing',
                ]}
              />
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">Prototyping</h3>
              <TickList
                className="mt-4"
                items={['3D printing (SLA, FDM)', 'CNC machining', 'PCB assembly and rework']}
              />
            </Card>
          </Reveal>
          <Reveal delay={160}>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">Production</h3>
              <TickList
                className="mt-4"
                items={[
                  'Final assembly and functional test',
                  'RF welding for pneumatic garments',
                  'Packaging and UDI labeling',
                ]}
              />
            </Card>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-6 text-[0.88rem] text-text-tertiary">
            Edit this list to match your actual equipment.
          </p>
        </Reveal>
      </Section>
    </>
  )
}
