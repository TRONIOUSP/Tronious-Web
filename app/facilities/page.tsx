import type { Metadata } from 'next'
import manufacturingImage from '@/public/images/precision-assembly.png'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import TickList from '@/components/ui/TickList'
import Button from '@/components/ui/Button'
import FacilitySchematic from '@/components/figures/FacilitySchematic'
import Reveal from '@/components/ui/Reveal'
import MediaPanel from '@/components/ui/MediaPanel'

export const metadata: Metadata = {
  title: 'Facilities | TRONIOUS',
  description:
    'Explore the connected engineering, prototyping, test and controlled-production capabilities behind TRONIOUS device programs.',
  alternates: { canonical: '/facilities' },
}

const FACILITY_FACTS = [
  {
    label: 'Production model',
    value: 'Lines configured around each project’s volume and process route',
  },
  {
    label: 'Controlled environment',
    value: 'ESD-protected assembly and test areas',
  },
  {
    label: 'Scale path',
    value: 'A connected route from pilot lots to volume production',
  },
  {
    label: 'Team access',
    value: 'Mechanical, electronics, firmware, quality and regulatory in one loop',
  },
]

const EQUIPMENT_AREAS = [
  {
    title: 'Test & measurement',
    lead: 'Evidence from bench verification through production release.',
    items: [
      'Electrical safety and hipot testers',
      'Pressure and flow calibration',
      'Thermal chambers and data loggers',
      'Force and load testing',
    ],
  },
  {
    title: 'Prototyping',
    lead: 'Short feedback loops for mechanical and electronic iterations.',
    items: ['3D printing (SLA, FDM)', 'CNC machining', 'PCB assembly and rework'],
  },
  {
    title: 'Production',
    lead: 'Repeatable processes for assembly, test, labeling and pack-out.',
    items: [
      'Final assembly and functional test',
      'RF welding for pneumatic garments',
      'Packaging and UDI labeling',
    ],
  },
]

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
              lead="Engineering, prototyping, validation and controlled production stay connected, so the knowledge built at the bench reaches every released unit."
            />
          </Reveal>
          <Reveal delay={100}>
            <MediaPanel
              src={manufacturingImage}
              alt="Illustrative electronics assembly and validation workcell"
              eyebrow="Production environment"
              caption="Assembly, inspection and validation organized around the device journey"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Facility model"
            title="One connected path from bench to production"
            lead="The environment is organized around the work a device needs, not isolated departments. Each zone feeds evidence and production knowledge into the next."
          />
        </Reveal>
        <FacilitySchematic className="mt-10" />
        <dl data-facility-facts="">
          {FACILITY_FACTS.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 60}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="In-house capability"
            title="The equipment behind each development stage"
            lead="Core prototyping, measurement and production capabilities stay close to the engineers making the decisions."
          />
        </Reveal>
        <div data-facility-equipment-grid="">
          {EQUIPMENT_AREAS.map((area, index) => (
            <Reveal key={area.title} delay={index * 80} className="h-full">
              <Card as="article" className="facility-equipment-card">
                <div data-equipment-card-head="">
                  <span data-equipment-index="">{String(index + 1).padStart(2, '0')}</span>
                  <span data-equipment-kicker="">Capability group</span>
                </div>
                <h3>{area.title}</h3>
                <p>{area.lead}</p>
                <TickList items={area.items} />
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div data-facility-note="">
            <span>Program-specific setup</span>
            <p>
              Production fixtures, validation methods and line configuration are defined around
              the device, its risk controls and expected volume.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="band">
        <Reveal>
          <div data-cta-end="">
            <h2>Need a clear route from released design to production?</h2>
            <p data-hero-lead="">
              Bring us the device, current evidence and expected volume. We will map the facility,
              test and transfer work needed for a controlled launch.
            </p>
            <div data-btns="">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <Button href="/manufacturing" variant="ghost" size="lg">
                Explore manufacturing
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
