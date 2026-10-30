import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Home | [Company Name]',
  description:
    'We take traction, compression, massage and thermal therapy devices from first sketch to production, ready for the US, EU and Australian markets.',
}

export default function Home() {
  return (
    <Sheet doc="WEB-001" sheetTitle="Your device. Designed, cleared and built by one team.">
      <section className="hx">
        <div className="hx-grid">
          <div className="hx-copy">
            <span className="hx-eyebrow">Contract design &amp; manufacturing · Therapy and recovery devices</span>
            <h1>Your device. <span className="hx-hl">Designed, cleared and built</span> by one team.</h1>
            <p className="hx-lead">We take traction, compression, massage and thermal therapy devices from first sketch to production, ready for the US, EU and Australian markets.</p>
            <div className="btns"><Link className="btn hx-primary" href="/contact">Start a project</Link><Link className="btn hx-ghost" href="/process">How we work</Link></div>
            <ul className="hx-markets" aria-label="Markets">
              <li><b>US</b> FDA 510(k)</li><li><b>EU</b> MDR 2017/745</li><li><b>AU</b> TGA · ARTG</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hx-cert">
        <span className="eyebrow">Certified to the standards your buyers check first</span>
        <div className="badges">
          <span className="badge">ISO 13485:2016</span><span className="badge">MDSAP</span><span className="badge">FDA Registered Facility</span><span className="badge">QMSR · 21 CFR 820</span><span className="badge">EU MDR</span><span className="badge">TGA</span><span className="badge">IEC 60601-1</span>
        </div>
      </section>

      <section>
        <div className="sec-head"><span className="eyebrow">Device expertise</span><h2>Five device families. Nothing else.</h2><p>Focus means our test plans, suppliers and production lines are already proven on devices like yours.</p></div>
        <div className="fam">
          <Link className="fam-card" href="/expertise">
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="18" y="4" width="12" height="7" rx="2" /><rect x="17" y="14" width="14" height="7" rx="2" /><rect x="16" y="24" width="16" height="7" rx="2" /><rect x="15" y="34" width="18" height="8" rx="2" /><path d="M8 4v38M4 8l4-4 4 4M4 38l4 4 4-4" /></svg>
            <h3>Spinal traction</h3><p>Cervical and lumbar tables, force controllers</p></Link>
          <Link className="fam-card" href="/expertise">
            <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4l4 18M28 26l-4 18" /><circle cx="24" cy="24" r="5" /><path d="M36 14v20M32 18l4-4 4 4M32 30l4 4 4-4" /></svg>
            <h3>Knee traction &amp; rehab</h3><p>Distraction, CPM and rehab devices</p></Link>
          <Link className="fam-card" href="/expertise">
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="14" y="4" width="20" height="9" rx="3" /><rect x="16" y="15" width="16" height="9" rx="3" /><rect x="18" y="26" width="12" height="9" rx="3" /><rect x="19" y="37" width="10" height="7" rx="3" /></svg>
            <h3>Pneumatic compression</h3><p>Sequential pumps and multi-chamber garments</p></Link>
          <Link className="fam-card" href="/expertise">
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="16" y="6" width="16" height="22" rx="4" /><path d="M24 28v8" /><circle cx="24" cy="40" r="4" /><path d="M8 34c3-3 3-7 0-10M40 34c-3-3-3-7 0-10" /></svg>
            <h3>Massage &amp; mechanical compression</h3><p>Percussive, vibration and mechanical</p></Link>
          <Link className="fam-card" href="/expertise">
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="30" width="36" height="12" rx="3" /><path d="M14 24c-3-4 3-6 0-10s3-6 0-10M24 24c-3-4 3-6 0-10s3-6 0-10M34 24c-3-4 3-6 0-10s3-6 0-10" /></svg>
            <h3>Thermal therapy</h3><p>Heat, cold and contrast therapy</p></Link>
        </div>
      </section>

      <section>
        <div className="sec-head"><span className="eyebrow">Engineering under one roof</span><h2>Every discipline your device needs</h2></div>
        <div className="capgrid">
          <Link href="/engineering"><b>Mechanical &amp; pneumatic</b><span>Frames, enclosures, bladders, garments</span></Link>
          <Link href="/engineering"><b>PCB &amp; electronics</b><span>Isolation, motor and heater control, EMC</span></Link>
          <Link href="/engineering"><b>Embedded firmware</b><span>IEC 62304 control and safety software</span></Link>
          <Link href="/engineering"><b>Mobile apps</b><span>iOS and Android, BLE, cybersecurity</span></Link>
          <Link href="/engineering"><b>Wearables</b><span>Body-worn compression and heat</span></Link>
          <Link href="/engineering"><b>Test equipment</b><span>V&amp;V rigs and end-of-line testers</span></Link>
        </div>
      </section>

      <section className="band-soft">
        <div className="sec-head"><span className="eyebrow">One partner, start to finish</span><h2>From concept to shipped units</h2></div>
        <ol className="flow">
          <li><span className="flow-k">Concept</span><span>Needs, feasibility and regulatory pathway</span></li>
          <li><span className="flow-k">Design</span><span>Mechanical, electronics, firmware, pneumatics</span></li>
          <li><span className="flow-k">Test</span><span>IEC 60601, usability, biocompatibility</span></li>
          <li><span className="flow-k">Submit</span><span>510(k), MDR technical file, TGA</span></li>
          <li><span className="flow-k">Build</span><span>Pilot runs to volume production</span></li>
        </ol>
        <Link className="more" href="/process">See every phase and its deliverables →</Link>
      </section>

      <section>
        <div className="sec-head"><span className="eyebrow">Track record</span><h2>Numbers that matter to a device brand</h2></div>
        <div className="stats">
          <div><span className="stat-n"><span className="ph">[XX]</span></span><span className="stat-l">Regulatory submissions supported</span></div>
          <div><span className="stat-n"><span className="ph">[XX]</span></span><span className="stat-l">Devices in commercial production</span></div>
          <div><span className="stat-n"><span className="ph">[XX] mo</span></span><span className="stat-l">Average concept to clearance</span></div>
          <div><span className="stat-n"><span className="ph">[XXk]</span></span><span className="stat-l">Units shipped per year</span></div>
        </div>
      </section>

      <section>
        <blockquote className="quote">
          <p><span className="ph">[Client quote: one or two sentences about speed, quality or regulatory success. Get written permission.]</span></p>
          <footer><span className="ph">[Name]</span>, <span className="ph">[Title]</span>, <span className="ph">[Company or &quot;US recovery device brand&quot;]</span></footer>
        </blockquote>
      </section>

      <section className="hx hx-end">
        <div className="hx-end-in">
          <h2>Have a device idea, or a design that needs a new manufacturer?</h2>
          <p className="hx-lead">Tell us your stage. We reply within <span className="ph">[2]</span> business days and sign an NDA before any technical discussion.</p>
          <div className="btns"><Link className="btn hx-primary" href="/contact">Start a project</Link><Link className="btn hx-ghost" href="/engagement">Engagement models</Link></div>
        </div>
      </section>
    </Sheet>
  )
}
