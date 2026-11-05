import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import TickList from '@/components/ui/TickList'
import DataTable from '@/components/ui/DataTable'
import Ph from '@/components/ui/Ph'
import FacilitySchematic from '@/components/figures/FacilitySchematic'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Facilities | TRONIOUS',
  description:
    'Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image.',
}

export default function Facilities() {
  return (
    <>
      <Section tone="band" data-doc="WEB-050">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Facilities & capabilities"
            title="Where your device gets built"
            lead="Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image."
          />
        </Reveal>
      </Section>

      <Section>
        <FacilitySchematic />
        <Reveal>
          <DataTable className="mt-8">
            <table style={{ minWidth: 0 }}>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>
                    <Ph>[City, Country]</Ph>
                  </td>
                </tr>
                <tr>
                  <td>Total floor area</td>
                  <td data-numeric="">
                    <Ph>[XX,XXX m²]</Ph>
                  </td>
                </tr>
                <tr>
                  <td>Production lines</td>
                  <td data-numeric="">
                    <Ph>[X] assembly lines</Ph>
                  </td>
                </tr>
                <tr>
                  <td>Controlled environments</td>
                  <td>
                    <Ph>[ESD-protected areas / cleanroom class]</Ph>
                  </td>
                </tr>
                <tr>
                  <td>Annual capacity</td>
                  <td data-numeric="">
                    <Ph>[XXX,XXX units]</Ph>
                  </td>
                </tr>
                <tr>
                  <td>Engineering team</td>
                  <td data-numeric="">
                    <Ph>[XX] engineers</Ph>
                  </td>
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
