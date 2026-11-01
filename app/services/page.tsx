import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Services | [Company Name]',
  description:
    "Use us for a single phase or the full journey. Each service runs under our ISO 13485 quality system, so documentation transfers cleanly into your design history file.",
}

export default function Services() {
  return (
    <Sheet doc="WEB-010">
      <section><span className="eyebrow">Services</span><h1>Every stage, under one quality system</h1><p className="lead">Use us for a single phase or the full journey. Each service runs under our ISO 13485 quality system, so documentation transfers cleanly into your design history file.</p></section>
      <section>
        <div className="grid">
          <div className="cell"><span className="eyebrow">01 · Design</span><h3>Product design &amp; engineering</h3><ul className="ticks"><li>Industrial design and human factors</li><li>Mechanical and pneumatic systems</li><li>Electronics and power design</li><li>Embedded firmware to IEC 62304</li><li>Mobile apps and wearable devices</li><li>Test equipment and production fixtures</li></ul><Link className="more" href="/engineering">Engineering details →</Link></div>
          <div className="cell"><span className="eyebrow">02 · Regulatory</span><h3>Regulatory strategy &amp; submissions</h3><ul className="ticks"><li>Classification and pathway strategy</li><li>FDA 510(k) preparation</li><li>EU MDR technical documentation</li><li>TGA / ARTG support</li><li>Labeling and IFU development</li></ul></div>
          <div className="cell"><span className="eyebrow">03 · Testing</span><h3>Verification &amp; validation</h3><ul className="ticks"><li>IEC 60601-1, -1-2, -1-11 test planning</li><li>Test lab coordination and pre-compliance</li><li>Usability engineering to IEC 62366-1</li><li>Biocompatibility to ISO 10993</li><li>Software verification</li></ul></div>
          <div className="cell"><span className="eyebrow">04 · Manufacturing</span><h3>Production</h3><ul className="ticks"><li>Prototypes and pilot builds</li><li>Design transfer and process validation</li><li>Volume assembly and test</li><li>Device history records per unit</li></ul><Link className="more" href="/manufacturing">Manufacturing details →</Link></div>
          <div className="cell"><span className="eyebrow">05 · Supply chain</span><h3>Supply chain, packaging &amp; labeling</h3><ul className="ticks"><li>Supplier qualification and audits</li><li>UDI labeling for US and EU</li><li>Packaging design and validation</li><li>Direct shipment to your distributors</li></ul></div>
          <div className="cell"><span className="eyebrow">06 · Post-market</span><h3>Sustaining engineering</h3><ul className="ticks"><li>Complaint investigation support</li><li>CAPA and design changes</li><li>Component obsolescence management</li><li>Cost-down redesigns</li></ul></div>
        </div>
      </section>
      <section className="split">
        <div style={{ display: 'grid', gap: '10px' }}><h2>Not sure where to start?</h2><p>Most clients arrive with either a concept, a prototype, or a cleared design that needs a new manufacturer. We&apos;ll recommend the right starting point after one call.</p></div>
        <div className="btns" style={{ alignContent: 'center' }}><Link className="btn primary" href="/contact">Book a scoping call</Link><Link className="btn ghost" href="/engagement">Engagement models</Link></div>
      </section>
    </Sheet>
  )
}
