import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Insights | [Company Name]',
  description:
    'Practical articles that show your expertise and bring in buyers through search. Suggested first articles:',
}

export default function Insights() {
  return (
    <Sheet doc="WEB-090" sheetTitle="Guides for device brands">
      <section><span className="eyebrow">Insights</span><h1>Guides for device brands</h1><p className="lead">Practical articles that show your expertise and bring in buyers through search. Suggested first articles:</p></section>
      <section>
        <div className="grid">
          <div className="cell"><span className="eyebrow">Regulatory</span><h3>510(k) or De Novo? Choosing a pathway for a new traction device</h3></div>
          <div className="cell"><span className="eyebrow">Testing</span><h3>IEC 60601 testing for pneumatic compression devices: common failures</h3></div>
          <div className="cell"><span className="eyebrow">EU MDR</span><h3>Technical documentation pitfalls for physical therapy devices</h3></div>
          <div className="cell"><span className="eyebrow">Design</span><h3>Designing heat therapy devices to IEC 80601-2-35</h3></div>
          <div className="cell"><span className="eyebrow">Manufacturing</span><h3>Moving production to a new contract manufacturer without re-clearance</h3></div>
          <div className="cell"><span className="eyebrow">Australia</span><h3>Getting a device onto the ARTG using MDSAP evidence</h3></div>
        </div>
      </section>
    </Sheet>
  )
}
