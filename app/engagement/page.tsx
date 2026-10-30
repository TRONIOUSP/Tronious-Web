import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Engagement models | [Company Name]',
}

export default function Engagement() {
  return (
    <Sheet doc="WEB-060" sheetTitle="Choose how we work together">
      <section><span className="eyebrow">Engagement models</span><h1>Choose how we work together</h1></section>
      <section>
        <div className="grid">
          <div className="cell"><span className="eyebrow">Model A</span><h3>Design only</h3><p>We design and document the device. You manufacture or choose another manufacturer.</p></div>
          <div className="cell"><span className="eyebrow">Model B</span><h3>Build to print</h3><p>You bring a finished, cleared design. We industrialize and manufacture it.</p></div>
          <div className="cell"><span className="eyebrow">Model C</span><h3>Full turnkey</h3><p>Concept to cleared device to volume production, with one partner and one quality system.</p></div>
          <div className="cell"><span className="eyebrow">Model D</span><h3>Platform / private label</h3><p>Start from our proven device platforms and customize branding and features. <span className="ph">[Remove if not offered]</span></p></div>
        </div>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>Every client asks who owns the design. State your standard position clearly here, for example: <span className="ph ph-wrap">[Client owns all device-specific IP and design files; we retain our pre-existing platform technology and general know-how.]</span> Have your legal team approve this wording.</p>
      </section>
    </Sheet>
  )
}
