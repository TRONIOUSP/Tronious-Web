import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Manufacturing | [Company Name]',
  description:
    'A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record.',
}

export default function Manufacturing() {
  return (
    <Sheet doc="WEB-055">
      <section>
        <span className="eyebrow">Manufacturing</span>
        <h1>From released design to thousands of units a month</h1>
        <p className="lead">A controlled design transfer, then volume production where every unit is tested, traceable and released against a device history record.</p>
        <nav className="jump" aria-label="On this page">
          <a href="#m-dt">Design transfer</a>
          <a href="#m-flow">Production flow</a>
          <a href="#m-qc">Quality controls</a>
          <a href="#m-scale">Scaling</a>
        </nav>
      </section>

      <section id="m-dt">
        <div className="sec-head"><span className="eyebrow">Stage 1</span><h2>Design transfer</h2><p>Design transfer turns a verified design into a process that produces the same device every time. Rushing it is the most common cause of production problems and recalls, so we treat it as its own phase with its own gate.</p></div>
        <ol className="steps num">
          <li><div><h3>Production readiness review</h3><p>Engineering, quality and production confirm the design is complete, verified and manufacturable. Open design issues are closed or formally accepted.</p></div></li>
          <li><div><h3>Device master record</h3><p>We compile the full production recipe: drawings, BOM, specifications, work instructions, test procedures, labeling and packaging.</p></div></li>
          <li><div><h3>Supplier qualification</h3><p>Critical suppliers are audited and approved. First article inspection confirms every new part matches its drawing.</p></div></li>
          <li><div><h3>Process risk analysis</h3><p>A process FMEA identifies where assembly could go wrong and defines the controls that prevent it.</p></div></li>
          <li><div><h3>Process validation</h3><p>Processes whose results can&apos;t be fully checked afterwards (RF welding, soldering, adhesive bonding, ultrasonic welding) are validated through installation, operational and performance qualification (IQ / OQ / PQ).</p></div></li>
          <li><div><h3>Test method validation</h3><p>Production testers and fixtures are validated, so a pass truly means the unit is good.</p></div></li>
          <li><div><h3>Training and pilot builds</h3><p>Operators are trained on the work instructions. We build <span className="ph">[2–3]</span> pilot lots, inspect them fully and fix any issues found.</p></div></li>
          <li><div><h3>Transfer sign-off</h3><p>You and our quality team approve the transfer. The design is released to production under formal change control.</p></div></li>
        </ol>
        <div className="note">Deliverables: device master record, supplier approvals, first article reports, process FMEA, validation protocols and reports, validated test methods, training records and pilot build data.</div>
      </section>

      <section id="m-flow" className="band-soft">
        <div className="sec-head"><span className="eyebrow">Stage 2</span><h2>Volume production flow</h2><p>The route every unit takes through our facility.</p></div>
        <ol className="pflow">
          <li><b>Incoming inspection</b><span>Parts checked against specification, by sampling plan or 100% for critical parts</span></li>
          <li><b>Kitting</b><span>Parts issued to work orders through our ERP, with lot numbers recorded</span></li>
          <li><b>PCB assembly</b><span>SMT and through-hole assembly <span className="ph">[in-house / at a qualified partner]</span>, with AOI and functional board test</span></li>
          <li><b>Sub-assembly</b><span>Pneumatic modules, motor assemblies, garments and harnesses</span></li>
          <li><b>Final assembly</b><span>Assembly to controlled work instructions at each station</span></li>
          <li><b>End-of-line test</b><span>100% functional test plus electrical safety (dielectric strength, leakage current, earth continuity)</span></li>
          <li><b>Burn-in</b><span>Units run under load to catch early failures, where the risk analysis calls for it</span></li>
          <li><b>Labeling &amp; packaging</b><span>Serial and UDI labels, IFU and validated packaging</span></li>
          <li><b>Final QC &amp; release</b><span>Device history record reviewed and the lot released by quality</span></li>
          <li><b>Shipping</b><span>To your warehouses or distributors in the US, EU and Australia, with a certificate of conformance</span></li>
        </ol>
      </section>

      <section id="m-qc">
        <div className="sec-head"><span className="eyebrow">Quality controls</span><h2>Built-in quality, every unit</h2></div>
        <div className="grid">
          <div className="cell"><h3>Full traceability</h3><p>Every unit is serialised and linked to its component lots, test results and operators, so any issue can be traced in minutes.</p></div>
          <div className="cell"><h3>Device history records</h3><p>Electronic records for every unit and lot, available to you on request or through a client portal <span className="ph">[if offered]</span>.</p></div>
          <div className="cell"><h3>Process monitoring</h3><p>Statistical process control on key parameters, with yield and defect data reported to you each <span className="ph">[month]</span>.</p></div>
          <div className="cell"><h3>Nonconformance &amp; CAPA</h3><p>Defects are contained, investigated for root cause and corrected through our CAPA system.</p></div>
          <div className="cell"><h3>Change control</h3><p>No change to parts, suppliers or processes without impact assessment and your written approval.</p></div>
          <div className="cell"><h3>Complaint support</h3><p>We investigate returned units and supply the data you need for complaint handling and regulatory reporting.</p></div>
        </div>
      </section>

      <section id="m-scale">
        <div className="sec-head"><span className="eyebrow">Scaling</span><h2>Grow without changing manufacturer</h2></div>
        <div className="tablewrap"><table>
          <thead><tr><th>Stage</th><th>Typical volume</th><th>Setup</th></tr></thead>
          <tbody>
            <tr><td>Pilot</td><td className="num"><span className="ph">[Up to 500 units]</span></td><td>Flexible cell, engineers on the line, rapid fixes</td></tr>
            <tr><td>Launch</td><td className="num"><span className="ph">[500–5,000 / year]</span></td><td>Dedicated workstations, validated testers</td></tr>
            <tr><td>Volume</td><td className="num"><span className="ph">[5,000+ / year]</span></td><td>Dedicated line, automated test, safety stock agreements</td></tr>
          </tbody>
        </table></div>
        <p>Already in production elsewhere? We also take over manufacturing of cleared devices from other manufacturers. <Link href="/contact">Talk to us about a transfer</Link>.</p>
      </section>
    </Sheet>
  )
}
