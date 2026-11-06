import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import JumpNav from '@/components/ui/JumpNav'
import Button from '@/components/ui/Button'
import MarketCoverageFigure from '@/components/figures/MarketCoverageFigure'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Quality & Regulatory | TRONIOUS',
  description:
    'Supplier qualification teams usually start here. Current evidence is available on request in our supplier pack.',
}

const JUMP_LINKS = [
  { href: '#qualification-evidence', label: 'Qualification evidence' },
  { href: '#market-experience', label: 'Market experience' },
  { href: '#clearance-roles', label: 'Clearance roles' },
]

const EVIDENCE_GROUPS = [
  {
    index: '01',
    badge: 'Quality system',
    title: 'Quality-system evidence',
    lead: 'Current certificates are reviewed as controlled evidence, with their scope and validity checked during supplier qualification.',
    items: ['ISO 13485:2016 certificate', 'MDSAP certificate', 'Certified scope and validity dates'],
    note: 'Review in the current supplier pack',
  },
  {
    index: '02',
    badge: 'Registration',
    title: 'Establishment evidence',
    lead: 'Registration evidence is kept separate from quality-system certification so each claim can be checked on its own terms.',
    items: ['FDA establishment registration', 'Contract-manufacturer role', 'Current establishment details'],
    note: 'Confirm against current registration records',
  },
  {
    index: '03',
    badge: 'Client documentation',
    title: 'Regulatory support capability',
    lead: 'EU MDR technical-documentation support is a service capability for the client legal manufacturer, not a TRONIOUS product clearance.',
    items: ['Technical-documentation support', 'Client CE-marking evidence', 'Notified-body coordination support'],
    note: 'Scope to the client and intended device',
  },
]

const MARKETS = [
  {
    eyebrow: 'United States',
    title: 'FDA',
    lead: '510(k) preparation, predicate strategy, pre-submission meetings, establishment registration and device listing support.',
    route: '510(k) · QMSR',
  },
  {
    eyebrow: 'European Union',
    title: 'EU MDR',
    lead: 'Technical documentation, clinical evaluation support, GSPR checklists, UDI and EUDAMED data, notified body coordination.',
    route: 'MDR 2017/745 · CE',
  },
  {
    eyebrow: 'Australia',
    title: 'TGA',
    lead: 'ARTG inclusion support for your Australian sponsor, using MDSAP and CE evidence where accepted.',
    route: 'TGA · ARTG',
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
            lead="Supplier qualification teams usually start here. Current evidence is available on request in our supplier pack."
          />
          <JumpNav links={JUMP_LINKS} className="mt-8" />
        </Reveal>
      </Section>

      <Section id="qualification-evidence">
        <Reveal>
          <SectionHead
            eyebrow="Supplier qualification"
            title="Evidence grouped by what it proves"
            lead="Certificate bodies, registration records and validity dates change. We provide the current controlled documents for review instead of presenting incomplete fields as proof."
          />
        </Reveal>
        <div data-quality-evidence-grid="">
          {EVIDENCE_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <Card className="p-6 sm:p-7" as="article">
                <div data-quality-card-top="">
                  <span data-quality-index="">{group.index}</span>
                  <Badge>{group.badge}</Badge>
                </div>
                <h3>{group.title}</h3>
                <p>{group.lead}</p>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <span data-quality-note="">{group.note}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div data-verification-path="">
            <span data-eyebrow="">A clean review path</span>
            <ol>
              <li><span>01</span><b>Request</b><p>Obtain the current supplier pack.</p></li>
              <li><span>02</span><b>Match</b><p>Check issuer, scope and validity against your requirement.</p></li>
              <li><span>03</span><b>Confirm</b><p>Record the client and contract-manufacturer responsibilities.</p></li>
            </ol>
          </div>
        </Reveal>
      </Section>

      <Section id="market-experience" tone="sunken" rule>
        <Reveal>
          <SectionHead
            eyebrow="Regulatory routes"
            title="Experience aligned to each market"
            lead="The evidence package changes by jurisdiction. The development record stays connected while the submission route and local roles change."
          />
        </Reveal>
        <MarketCoverageFigure className="mt-8" />
        <div data-market-card-grid="">
          {MARKETS.map((market, index) => (
            <Reveal key={market.eyebrow} delay={index * 80}>
              <Card className="p-6 sm:p-7" as="article">
                <span data-market-number="">0{index + 1}</span>
                <span data-eyebrow="">{market.eyebrow}</span>
                <h3>{market.title}</h3>
                <p>{market.lead}</p>
                <span data-market-route="">{market.route}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="clearance-roles">
        <Reveal>
          <SectionHead
            eyebrow="Responsibility boundary"
            title="Who holds the clearance?"
            lead="The regulatory role is explicit from the start so ownership of the submission, evidence and manufactured product does not blur."
          />
        </Reveal>
        <div data-clearance-boundary="">
          <Reveal>
            <Card className="p-6 sm:p-8">
              <span data-clearance-role="">Client</span>
              <h3>Legal manufacturer</h3>
              <p>Normally holds the 510(k), CE certificate and ARTG entry.</p>
            </Card>
          </Reveal>
          <div data-boundary-link="" aria-hidden="true"><span>Evidence & documentation</span></div>
          <Reveal delay={80}>
            <Card className="p-6 sm:p-8">
              <span data-clearance-role="">TRONIOUS</span>
              <h3>Contract design & manufacturing partner</h3>
              <p>Prepares the evidence and documentation, and manufactures under the certified quality system.</p>
            </Card>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <p data-boundary-note="">Other arrangements can be discussed case by case and documented before the engagement begins.</p>
        </Reveal>
      </Section>

      <Section tone="band">
        <Reveal>
          <div data-cta-end="">
            <h2>Need evidence for supplier qualification?</h2>
            <p data-hero-lead="">
              Request the current supplier pack, then map the regulatory scope and legal-manufacturer roles for your device.
            </p>
            <div data-btns="">
              <Button href="/contact" size="lg">Start a qualification conversation</Button>
              <Button href="/engagement" variant="ghost" size="lg">Review engagement models</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
