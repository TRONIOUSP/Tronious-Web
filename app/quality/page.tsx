import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Quality & Regulatory | [Company Name]',
  description:
    'Supplier qualification teams usually start here. Certificates are available on request or in our supplier pack.',
}

export default function Quality() {
  return (
    <Sheet doc="WEB-040">
      <section><span className="eyebrow">Quality &amp; Regulatory</span><h1>Built for audits in three markets</h1><p className="lead">Supplier qualification teams usually start here. Certificates are available on request or in our supplier pack.</p></section>
      <section>
        <h2>Certifications &amp; registrations</h2>
        <div className="tablewrap"><table>
          <thead><tr><th>Certification</th><th>Scope</th><th>Issued by</th><th>Valid until</th></tr></thead>
          <tbody>
            <tr><td>ISO 13485:2016</td><td>Design, development and manufacture of medical devices</td><td><span className="ph">[Certification body]</span></td><td className="num"><span className="ph">[Date]</span></td></tr>
            <tr><td>MDSAP</td><td>Covers US, Australia, Canada, Brazil, Japan</td><td><span className="ph">[Auditing organization]</span></td><td className="num"><span className="ph">[Date]</span></td></tr>
            <tr><td>FDA establishment registration</td><td>Contract manufacturer</td><td>US FDA</td><td className="num"><span className="ph">[FEI number]</span></td></tr>
            <tr><td>EU MDR support</td><td>Technical documentation for client CE marking</td><td>Client&apos;s notified body</td><td className="num">—</td></tr>
          </tbody>
        </table></div>
      </section>
      <section>
        <h2>Regulatory experience by market</h2>
        <div className="grid">
          <div className="cell"><span className="eyebrow">United States</span><h3>FDA</h3><p>510(k) preparation, predicate strategy, pre-submission meetings, establishment registration and device listing support.</p></div>
          <div className="cell"><span className="eyebrow">European Union</span><h3>EU MDR</h3><p>Technical documentation, clinical evaluation support, GSPR checklists, UDI and EUDAMED data, notified body coordination.</p></div>
          <div className="cell"><span className="eyebrow">Australia</span><h3>TGA</h3><p>ARTG inclusion support for your Australian sponsor, using MDSAP and CE evidence where accepted.</p></div>
        </div>
      </section>
      <section>
        <h2>Who holds the clearance?</h2>
        <p>In most engagements, our client is the legal manufacturer and holds the 510(k), CE certificate and ARTG entry. We prepare the evidence and documentation, and manufacture under our certified quality system. We can discuss other arrangements case by case.</p>
      </section>
    </Sheet>
  )
}
