import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import Ph from '@/components/ui/Ph'
import MarketCoverageFigure from '@/components/figures/MarketCoverageFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Quality & Regulatory | TRONIOUS',
  description:
    'Supplier qualification teams usually start here. Certificates are available on request or in our supplier pack.',
}

const MARKETS = [
  {
    eyebrow: 'United States',
    title: 'FDA',
    lead: '510(k) preparation, predicate strategy, pre-submission meetings, establishment registration and device listing support.',
  },
  {
    eyebrow: 'European Union',
    title: 'EU MDR',
    lead: 'Technical documentation, clinical evaluation support, GSPR checklists, UDI and EUDAMED data, notified body coordination.',
  },
  {
    eyebrow: 'Australia',
    title: 'TGA',
    lead: 'ARTG inclusion support for your Australian sponsor, using MDSAP and CE evidence where accepted.',
  },
]

export default function Quality() {
  return (
    <>
      <Section tone="band" data-doc="WEB-040">
        <Reveal>
          <SectionHead
            as="h1"
            eyebrow="Quality & Regulatory"
            title="Built for audits in three markets"
            lead="Supplier qualification teams usually start here. Certificates are available on request or in our supplier pack."
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
        <SectionHead title="Certifications & registrations" />
        <DataTable className="mt-8">
          <table>
            <thead>
              <tr>
                <th>Certification</th>
                <th>Scope</th>
                <th>Issued by</th>
                <th>Valid until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ISO 13485:2016</td>
                <td>Design, development and manufacture of medical devices</td>
                <td>
                  <Ph>[Certification body]</Ph>
                </td>
                <td data-numeric="">
                  <Ph>[Date]</Ph>
                </td>
              </tr>
              <tr>
                <td>MDSAP</td>
                <td>Covers US, Australia, Canada, Brazil, Japan</td>
                <td>
                  <Ph>[Auditing organization]</Ph>
                </td>
                <td data-numeric="">
                  <Ph>[Date]</Ph>
                </td>
              </tr>
              <tr>
                <td>FDA establishment registration</td>
                <td>Contract manufacturer</td>
                <td>US FDA</td>
                <td data-numeric="">
                  <Ph>[FEI number]</Ph>
                </td>
              </tr>
              <tr>
                <td>EU MDR support</td>
                <td>Technical documentation for client CE marking</td>
                <td>Client&apos;s notified body</td>
                <td data-numeric="">—</td>
              </tr>
            </tbody>
          </table>
        </DataTable>
        </Reveal>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHead title="Regulatory experience by market" />
        </Reveal>
        <MarketCoverageFigure className="mt-8" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {MARKETS.map((market, i) => (
            <Reveal key={market.eyebrow} delay={i * 80}>
              <Card className="p-6">
                <span
                  data-eyebrow=""
                  className="font-mono text-eyebrow uppercase tracking-[0.12em] text-text-tertiary"
                >
                  {market.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">{market.title}</h3>
                <p className="mt-2 text-text-secondary">{market.lead}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHead title="Who holds the clearance?" />
          <p className="mt-6 max-w-[68ch] text-text-secondary">
            In most engagements, our client is the legal manufacturer and holds the 510(k), CE
            certificate and ARTG entry. We prepare the evidence and documentation, and manufacture
            under our certified quality system. We can discuss other arrangements case by case.
          </p>
        </Reveal>
      </Section>
    </>
  )
}
