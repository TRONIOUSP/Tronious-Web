import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'About | [Company Name]',
  description:
    '[Founded in YYYY], we help medical device brands bring physical therapy and recovery devices to market in the US, EU and Australia.',
}

export default function About() {
  return (
    <Sheet doc="WEB-080" sheetTitle="Engineers and regulatory specialists who build therapy devices">
      <section><span className="eyebrow">About us</span><h1>Engineers and regulatory specialists who build therapy devices</h1><p className="lead"><span className="ph">[Founded in YYYY]</span>, we help medical device brands bring physical therapy and recovery devices to market in the US, EU and Australia.</p></section>
      <section>
        <h2>Our story</h2>
        <p><span className="ph">[2–3 paragraphs: why the company started, how it grew, what makes you different. Write in plain language.]</span></p>
      </section>
      <section>
        <h2>Leadership</h2>
        <div className="grid">
          <div className="cell"><span className="eyebrow">Chief Executive Officer</span><h3><span className="ph">[Name]</span></h3><p><span className="ph">[Background and years in medical devices]</span></p></div>
          <div className="cell"><span className="eyebrow">Head of Engineering</span><h3><span className="ph">[Name]</span></h3><p><span className="ph">[Devices designed, specialties]</span></p></div>
          <div className="cell"><span className="eyebrow">Head of Regulatory &amp; Quality</span><h3><span className="ph">[Name]</span></h3><p><span className="ph">[Submissions led, FDA / MDR / TGA experience]</span></p></div>
        </div>
      </section>
      <section>
        <h2>Join the team</h2>
        <p>We hire engineers, quality specialists and production staff. <Link href="/careers">See open roles</Link>.</p>
      </section>
    </Sheet>
  )
}
