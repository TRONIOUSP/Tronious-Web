import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Facilities | [Company Name]',
  description:
    'Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image.',
}

export default function Facilities() {
  return (
    <Sheet doc="WEB-050" sheetTitle="Where your device gets built">
      <section><span className="eyebrow">Facilities &amp; capabilities</span><h1>Where your device gets built</h1><p className="lead">Add photos of your production floor, test lab and engineering office here. Real photos matter more than any stock image.</p></section>
      <section>
        <div className="tablewrap"><table style={{ minWidth: 0 }}>
          <tbody>
            <tr><td>Location</td><td><span className="ph">[City, Country]</span></td></tr>
            <tr><td>Total floor area</td><td className="num"><span className="ph">[XX,XXX m²]</span></td></tr>
            <tr><td>Production lines</td><td className="num"><span className="ph">[X] assembly lines</span></td></tr>
            <tr><td>Controlled environments</td><td><span className="ph">[ESD-protected areas / cleanroom class]</span></td></tr>
            <tr><td>Annual capacity</td><td className="num"><span className="ph">[XXX,XXX units]</span></td></tr>
            <tr><td>Engineering team</td><td className="num"><span className="ph">[XX] engineers</span></td></tr>
          </tbody>
        </table></div>
      </section>
      <section>
        <h2>In-house equipment</h2>
        <div className="grid">
          <div className="cell"><h3>Test &amp; measurement</h3><ul className="ticks"><li>Electrical safety and hipot testers</li><li>Pressure and flow calibration</li><li>Thermal chambers and data loggers</li><li>Force and load testing</li></ul></div>
          <div className="cell"><h3>Prototyping</h3><ul className="ticks"><li>3D printing (SLA, FDM)</li><li>CNC machining</li><li>PCB assembly and rework</li></ul></div>
          <div className="cell"><h3>Production</h3><ul className="ticks"><li>Final assembly and functional test</li><li>RF welding for pneumatic garments</li><li>Packaging and UDI labeling</li></ul></div>
        </div>
        <p style={{ fontSize: '.88rem', color: 'var(--muted)' }}>Edit this list to match your actual equipment.</p>
      </section>
    </Sheet>
  )
}
