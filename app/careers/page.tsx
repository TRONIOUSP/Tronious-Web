import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Careers | [Company Name]',
  description: 'We hire people who care about getting the details right.',
}

export default function Careers() {
  return (
    <Sheet doc="WEB-110">
      <section><span className="eyebrow">Careers</span><h1>Build devices that help people recover</h1><p className="lead">We hire people who care about getting the details right.</p></section>
      <section>
        <div className="tablewrap"><table>
          <thead><tr><th>Role</th><th>Team</th><th>Location</th><th>Type</th></tr></thead>
          <tbody>
            <tr><td><span className="ph">[Senior Mechanical Engineer]</span></td><td>Engineering</td><td><span className="ph">[City]</span></td><td>Full-time</td></tr>
            <tr><td><span className="ph">[Regulatory Affairs Specialist]</span></td><td>Quality &amp; Regulatory</td><td><span className="ph">[City]</span></td><td>Full-time</td></tr>
            <tr><td><span className="ph">[Production Technician]</span></td><td>Manufacturing</td><td><span className="ph">[City]</span></td><td>Full-time</td></tr>
          </tbody>
        </table></div>
        <p>No matching role? Send your CV to <span className="ph">[careers@company.com]</span>.</p>
      </section>
    </Sheet>
  )
}
