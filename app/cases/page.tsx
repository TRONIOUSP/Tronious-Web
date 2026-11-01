import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Case studies | [Company Name]',
  description:
    'Client names are shared only with permission. The examples below are templates: replace them with your real projects.',
}

export default function Cases() {
  return (
    <Sheet doc="WEB-070">
      <section><span className="eyebrow">Case studies</span><h1>Projects we&apos;ve delivered</h1><p className="lead">Client names are shared only with permission. The examples below are templates: replace them with your real projects.</p></section>
      <section className="split">
        <div className="case">
          <div><span className="eyebrow">Pneumatic compression · Full turnkey</span><h3>Sequential compression system for a US sports-recovery brand</h3></div>
          <div><p><b>Challenge:</b> <span className="ph">[What the client needed]</span></p><p><b>Approach:</b> <span className="ph">[What you did]</span></p></div>
          <dl><div><dt>Timeline</dt><dd><span className="ph">[X] mo</span></dd></div><div><dt>Clearance</dt><dd>510(k)</dd></div><div><dt>Volume</dt><dd><span className="ph">[X]/mo</span></dd></div></dl>
        </div>
        <div className="case">
          <div><span className="eyebrow">Spinal traction · Build to print</span><h3>Lumbar traction table transferred from an EU manufacturer</h3></div>
          <div><p><b>Challenge:</b> <span className="ph">[What the client needed]</span></p><p><b>Approach:</b> <span className="ph">[What you did]</span></p></div>
          <dl><div><dt>Timeline</dt><dd><span className="ph">[X] mo</span></dd></div><div><dt>Market</dt><dd>EU MDR</dd></div><div><dt>Cost saved</dt><dd><span className="ph">[X]%</span></dd></div></dl>
        </div>
        <div className="case">
          <div><span className="eyebrow">Thermal therapy · Design only</span><h3>Home-use heat therapy wrap for an Australian brand</h3></div>
          <div><p><b>Challenge:</b> <span className="ph">[What the client needed]</span></p><p><b>Approach:</b> <span className="ph">[What you did]</span></p></div>
          <dl><div><dt>Timeline</dt><dd><span className="ph">[X] mo</span></dd></div><div><dt>Market</dt><dd>TGA</dd></div><div><dt>Standard</dt><dd>80601-2-35</dd></div></dl>
        </div>
      </section>
    </Sheet>
  )
}
