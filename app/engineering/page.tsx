import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import TickList from '@/components/ui/TickList'
import JumpNav from '@/components/ui/JumpNav'
import Ph from '@/components/ui/Ph'
import DisciplineIcon from '@/components/figures/DisciplineIcon'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Engineering | TRONIOUS',
  description:
    'Every discipline a connected therapy device needs, in one team, working under one design control process. Each discipline produces documentation that drops straight into your design history file.',
}

const DISCIPLINES = [
  {
    id: 'e-mech',
    discipline: 'mechanical' as const,
    eyebrow: '01 · Mechanical design',
    title: 'Mechanical & pneumatic design',
    lead: 'Structures that carry traction loads safely, enclosures that survive clinic cleaning, and pneumatic systems that hold pressure for years.',
    ticks: [
      'Industrial design, ergonomics and human factors for clinicians and home users',
      <>3D CAD and production drawings with GD&T, in <Ph>[SolidWorks / Creo]</Ph></>,
      'Tolerance stack-up analysis and FEA for load-bearing traction frames and joints',
      'Design for manufacture and assembly: injection-moulded, sheet metal, machined and cast parts',
      'Pneumatic systems: manifolds, valves, pumps, bladders and RF-welded compression garments',
      'Thermal design for heat therapy pads and electronics enclosures',
      'Ingress protection (IEC 60529) and cleaning and disinfectant compatibility',
    ],
    chips: ['3D models', 'Drawings with GD&T', 'Tolerance analysis', 'FEA report', 'DFM / DFA report', 'Mechanical BOM'],
  },
  {
    id: 'e-pcb',
    discipline: 'pcb' as const,
    eyebrow: '02 · Electronics',
    title: 'PCB & electronics design',
    lead: 'Circuits designed from the first schematic to pass IEC 60601 electrical safety and EMC testing, not fixed after they fail.',
    ticks: [
      <>Schematic capture and multilayer PCB layout in <Ph>[Altium Designer]</Ph></>,
      'Patient and operator isolation (MOPP / MOOP), with creepage and clearance designed in',
      'Motor drives and force sensing for traction; pressure sensing and valve control for compression',
      'Heater control with independent hardware thermal cut-offs',
      'Battery and charging circuits, with cells certified to IEC 62133-2',
      'EMC design and in-house pre-compliance testing to IEC 60601-1-2',
      'Component selection with lifecycle and obsolescence checks, and an approved vendor list',
      'Design for test: test points and interfaces ready for production test fixtures',
    ],
    chips: ['Schematics', 'Gerber & assembly files', 'BOM with approved vendors', 'Design calculations', 'Isolation diagram', 'Pre-compliance results'],
  },
  {
    id: 'e-fw',
    discipline: 'firmware' as const,
    eyebrow: '03 · Firmware',
    title: 'Embedded firmware',
    lead: 'Control software for force, pressure and temperature, built to the IEC 62304 medical software lifecycle with safety designed in.',
    ticks: [
      <>Embedded C / C++ on <Ph>[ARM Cortex-M]</Ph> microcontrollers, bare-metal or RTOS</>,
      'Closed-loop control: traction force profiles, chamber pressure sequencing, temperature regulation',
      'Safety architecture: watchdogs, self-tests, fault detection and safe-state handling, backed by hardware interlocks',
      'IEC 62304 lifecycle, software safety classification and SOUP management',
      'Coding standard (MISRA C), static analysis, and unit and integration testing',
      'Secure bootloader and firmware updates, including over the air',
      'Display and touch user interfaces, Bluetooth Low Energy and Wi-Fi stacks',
    ],
    chips: ['Software requirements', 'Architecture & design', 'Verification records', 'Traceability matrix', 'SOUP list', 'Release package'],
  },
  {
    id: 'e-app',
    discipline: 'app' as const,
    eyebrow: '04 · Connectivity',
    title: 'Mobile apps & connected devices',
    lead: 'Companion apps that run therapy programs, track compliance and connect clinicians to patients, with cybersecurity documented for your submission.',
    ticks: [
      'iOS and Android apps that pair with the device over Bluetooth Low Energy',
      'Therapy programs, session logging, reminders and progress tracking for users',
      'Clinician dashboards and cloud back-ends for remote monitoring',
      'Apps that control a device are developed as medical device software under IEC 62304',
      'Cybersecurity by design: threat modelling, SBOM and security testing, following FDA premarket cybersecurity requirements, IEC 81001-5-1 and EU guidance MDCG 2019-16',
      'Privacy by design for GDPR, and HIPAA where it applies',
      'App store release, versioning and maintenance',
    ],
    chips: ['iOS & Android apps', 'Source code', 'Threat model', 'SBOM', 'Security test report', 'Store listings'],
  },
  {
    id: 'e-wear',
    discipline: 'wearable' as const,
    eyebrow: '05 · Wearables',
    title: 'Wearable therapy devices',
    lead: 'Compact, battery-powered compression, heat and vibration devices that people wear during daily life or recovery.',
    ticks: [
      'Miniaturised electronics, flexible circuits and low-power design for all-day battery life',
      'Skin-contact materials selected and evaluated under the ISO 10993 series',
      'Sizing, fit and comfort studies across body types',
      'Safe surface temperatures and charging safety for products worn on the body',
      'Home-use design to IEC 60601-1-11',
      'Radio certification planning for each market: FCC (US), Radio Equipment Directive (EU), RCM (Australia)',
    ],
    chips: ['Wearable prototypes', 'Materials file', 'Battery life analysis', 'Fit study report', 'Radio test plan'],
  },
  {
    id: 'e-test',
    discipline: 'test' as const,
    eyebrow: '06 · Test systems',
    title: 'Test equipment & fixture design',
    lead: 'We design the rigs that prove your device works during development, and the testers that check every unit in production.',
    ticks: [
      'Verification rigs: force and load testers for traction, pressure-cycling rigs for bladders and garments',
      'Endurance and life-test rigs that run devices through thousands of cycles',
      'PCB test fixtures: bed-of-nails, functional and programming fixtures',
      <>End-of-line testers with automated pass / fail and results saved to each unit&apos;s device history record</>,
      'Calibration jigs for pressure, force and temperature sensors',
      'Test method validation and gauge R&R studies',
      "Validation of test software, as ISO 13485 and FDA's QMSR require",
    ],
    chips: ['Test rigs & fixtures', 'Test software', 'Test method validation', 'Gauge R&R', 'Software validation', 'Operator instructions'],
  },
]

const JUMP_LINKS = [
  { href: '#e-mech', label: 'Mechanical' },
  { href: '#e-pcb', label: 'PCB & electronics' },
  { href: '#e-fw', label: 'Firmware' },
  { href: '#e-app', label: 'Mobile apps' },
  { href: '#e-wear', label: 'Wearables' },
  { href: '#e-test', label: 'Test equipment' },
]

export default function Engineering() {
  return (
    <>
      <Section tone="band" data-doc="WEB-015">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Engineering"
            title="Mechanical, electronics, firmware, apps and test systems"
            lead="Every discipline a connected therapy device needs, in one team, working under one design control process. Each discipline produces documentation that drops straight into your design history file."
          />
          <JumpNav links={JUMP_LINKS} className="mt-8" />
        </Reveal>
      </Section>

      {DISCIPLINES.map(({ id, discipline, eyebrow, title, lead, ticks, chips }) => (
        <Section key={id} id={id} rule>
          <div data-cap="">
            <Reveal>
              <div data-cap-h="">
                <DisciplineIcon discipline={discipline} className="h-10 w-10 text-text-tertiary" />
                <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
              </div>
            </Reveal>
            <div data-cap-b="">
              <Reveal>
                <h3>What we do</h3>
                <TickList items={ticks} />
              </Reveal>
              <h3>You receive</h3>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip, i) => (
                  <Reveal key={chip} delay={i * 40}>
                    <Chip>{chip}</Chip>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="sunken">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <SectionHead
              as="h2"
              title="See how the disciplines fit together"
              lead="All six disciplines work through the same phase-gated process and hand over to production through a formal design transfer."
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <Button href="/process" variant="primary">
                Development process
              </Button>
              <Button href="/manufacturing" variant="ghost">
                Manufacturing
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
