import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import DataTable from '@/components/ui/DataTable'
import Ph from '@/components/ui/Ph'
import RoleMapFigure from '@/components/figures/RoleMapFigure'

export const metadata: Metadata = {
  title: 'Careers | [Company Name]',
  description: 'We hire people who care about getting the details right.',
}

const ROLES = [
  { title: '[Senior Mechanical Engineer]', team: 'Engineering', city: '[City]', type: 'Full-time' },
  {
    title: '[Regulatory Affairs Specialist]',
    team: 'Quality & Regulatory',
    city: '[City]',
    type: 'Full-time',
  },
  { title: '[Production Technician]', team: 'Manufacturing', city: '[City]', type: 'Full-time' },
]

export default function Careers() {
  return (
    <>
      <Section tone="band" data-doc="WEB-110">
        <SectionHead
          as="h1"
          eyebrow="Careers"
          title="Build devices that help people recover"
          lead="We hire people who care about getting the details right."
        />
      </Section>

      <Section>
        <RoleMapFigure />
        <DataTable className="mt-8">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Team</th>
                <th>Location</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role.title}>
                  <td>
                    <Ph>{role.title}</Ph>
                  </td>
                  <td>{role.team}</td>
                  <td>
                    <Ph>{role.city}</Ph>
                  </td>
                  <td>{role.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
        <p className="mt-6 text-text-secondary">
          No matching role? Send your CV to <Ph>[careers@company.com]</Ph>.
        </p>
      </Section>
    </>
  )
}
