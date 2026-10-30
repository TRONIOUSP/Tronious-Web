import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Engineering | [Company Name]',
  description:
    'Every discipline a connected therapy device needs, in one team, working under one design control process. Each discipline produces documentation that drops straight into your design history file.',
}

export default function Engineering() {
  return (
    <Sheet doc="WEB-015" sheetTitle="Mechanical, electronics, firmware, apps and test systems">
      <section>
        <span className="eyebrow">Engineering</span>
        <h1>Mechanical, electronics, firmware, apps and test systems</h1>
        <p className="lead">Every discipline a connected therapy device needs, in one team, working under one design control process. Each discipline produces documentation that drops straight into your design history file.</p>
        <nav className="jump" aria-label="On this page">
          <a href="#e-mech">Mechanical</a>
          <a href="#e-pcb">PCB &amp; electronics</a>
          <a href="#e-fw">Firmware</a>
          <a href="#e-app">Mobile apps</a>
          <a href="#e-wear">Wearables</a>
          <a href="#e-test">Test equipment</a>
        </nav>
      </section>

      <section className="cap" id="e-mech">
        <div className="cap-h"><span className="eyebrow">01 · Mechanical design</span><h2>Mechanical &amp; pneumatic design</h2><p>Structures that carry traction loads safely, enclosures that survive clinic cleaning, and pneumatic systems that hold pressure for years.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>Industrial design, ergonomics and human factors for clinicians and home users</li>
            <li>3D CAD and production drawings with GD&amp;T, in <span className="ph">[SolidWorks / Creo]</span></li>
            <li>Tolerance stack-up analysis and FEA for load-bearing traction frames and joints</li>
            <li>Design for manufacture and assembly: injection-moulded, sheet metal, machined and cast parts</li>
            <li>Pneumatic systems: manifolds, valves, pumps, bladders and RF-welded compression garments</li>
            <li>Thermal design for heat therapy pads and electronics enclosures</li>
            <li>Ingress protection (IEC 60529) and cleaning and disinfectant compatibility</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>3D models</span><span>Drawings with GD&amp;T</span><span>Tolerance analysis</span><span>FEA report</span><span>DFM / DFA report</span><span>Mechanical BOM</span></div>
        </div>
      </section>

      <section className="cap" id="e-pcb">
        <div className="cap-h"><span className="eyebrow">02 · Electronics</span><h2>PCB &amp; electronics design</h2><p>Circuits designed from the first schematic to pass IEC 60601 electrical safety and EMC testing, not fixed after they fail.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>Schematic capture and multilayer PCB layout in <span className="ph">[Altium Designer]</span></li>
            <li>Patient and operator isolation (MOPP / MOOP), with creepage and clearance designed in</li>
            <li>Motor drives and force sensing for traction; pressure sensing and valve control for compression</li>
            <li>Heater control with independent hardware thermal cut-offs</li>
            <li>Battery and charging circuits, with cells certified to IEC 62133-2</li>
            <li>EMC design and in-house pre-compliance testing to IEC 60601-1-2</li>
            <li>Component selection with lifecycle and obsolescence checks, and an approved vendor list</li>
            <li>Design for test: test points and interfaces ready for production test fixtures</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>Schematics</span><span>Gerber &amp; assembly files</span><span>BOM with approved vendors</span><span>Design calculations</span><span>Isolation diagram</span><span>Pre-compliance results</span></div>
        </div>
      </section>

      <section className="cap" id="e-fw">
        <div className="cap-h"><span className="eyebrow">03 · Firmware</span><h2>Embedded firmware</h2><p>Control software for force, pressure and temperature, built to the IEC 62304 medical software lifecycle with safety designed in.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>Embedded C / C++ on <span className="ph">[ARM Cortex-M]</span> microcontrollers, bare-metal or RTOS</li>
            <li>Closed-loop control: traction force profiles, chamber pressure sequencing, temperature regulation</li>
            <li>Safety architecture: watchdogs, self-tests, fault detection and safe-state handling, backed by hardware interlocks</li>
            <li>IEC 62304 lifecycle, software safety classification and SOUP management</li>
            <li>Coding standard (MISRA C), static analysis, and unit and integration testing</li>
            <li>Secure bootloader and firmware updates, including over the air</li>
            <li>Display and touch user interfaces, Bluetooth Low Energy and Wi-Fi stacks</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>Software requirements</span><span>Architecture &amp; design</span><span>Verification records</span><span>Traceability matrix</span><span>SOUP list</span><span>Release package</span></div>
        </div>
      </section>

      <section className="cap" id="e-app">
        <div className="cap-h"><span className="eyebrow">04 · Connectivity</span><h2>Mobile apps &amp; connected devices</h2><p>Companion apps that run therapy programs, track compliance and connect clinicians to patients, with cybersecurity documented for your submission.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>iOS and Android apps that pair with the device over Bluetooth Low Energy</li>
            <li>Therapy programs, session logging, reminders and progress tracking for users</li>
            <li>Clinician dashboards and cloud back-ends for remote monitoring</li>
            <li>Apps that control a device are developed as medical device software under IEC 62304</li>
            <li>Cybersecurity by design: threat modelling, SBOM and security testing, following FDA premarket cybersecurity requirements, IEC 81001-5-1 and EU guidance MDCG 2019-16</li>
            <li>Privacy by design for GDPR, and HIPAA where it applies</li>
            <li>App store release, versioning and maintenance</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>iOS &amp; Android apps</span><span>Source code</span><span>Threat model</span><span>SBOM</span><span>Security test report</span><span>Store listings</span></div>
        </div>
      </section>

      <section className="cap" id="e-wear">
        <div className="cap-h"><span className="eyebrow">05 · Wearables</span><h2>Wearable therapy devices</h2><p>Compact, battery-powered compression, heat and vibration devices that people wear during daily life or recovery.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>Miniaturised electronics, flexible circuits and low-power design for all-day battery life</li>
            <li>Skin-contact materials selected and evaluated under the ISO 10993 series</li>
            <li>Sizing, fit and comfort studies across body types</li>
            <li>Safe surface temperatures and charging safety for products worn on the body</li>
            <li>Home-use design to IEC 60601-1-11</li>
            <li>Radio certification planning for each market: FCC (US), Radio Equipment Directive (EU), RCM (Australia)</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>Wearable prototypes</span><span>Materials file</span><span>Battery life analysis</span><span>Fit study report</span><span>Radio test plan</span></div>
        </div>
      </section>

      <section className="cap" id="e-test">
        <div className="cap-h"><span className="eyebrow">06 · Test systems</span><h2>Test equipment &amp; fixture design</h2><p>We design the rigs that prove your device works during development, and the testers that check every unit in production.</p></div>
        <div className="cap-b">
          <h3>What we do</h3>
          <ul className="ticks">
            <li>Verification rigs: force and load testers for traction, pressure-cycling rigs for bladders and garments</li>
            <li>Endurance and life-test rigs that run devices through thousands of cycles</li>
            <li>PCB test fixtures: bed-of-nails, functional and programming fixtures</li>
            <li>End-of-line testers with automated pass / fail and results saved to each unit&apos;s device history record</li>
            <li>Calibration jigs for pressure, force and temperature sensors</li>
            <li>Test method validation and gauge R&amp;R studies</li>
            <li>Validation of test software, as ISO 13485 and FDA&apos;s QMSR require</li>
          </ul>
          <h3>You receive</h3>
          <div className="chips"><span>Test rigs &amp; fixtures</span><span>Test software</span><span>Test method validation</span><span>Gauge R&amp;R</span><span>Software validation</span><span>Operator instructions</span></div>
        </div>
      </section>

      <section className="split">
        <div style={{ display: 'grid', gap: '10px' }}><h2>See how the disciplines fit together</h2><p>All six disciplines work through the same phase-gated process and hand over to production through a formal design transfer.</p></div>
        <div className="btns" style={{ alignContent: 'center' }}><Link className="btn primary" href="/process">Development process</Link><Link className="btn ghost" href="/manufacturing">Manufacturing</Link></div>
      </section>
    </Sheet>
  )
}
