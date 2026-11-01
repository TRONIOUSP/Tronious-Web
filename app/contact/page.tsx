import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Start a Project | [Company Name]',
  description:
    "We reply within [2] business days. We sign an NDA before any detailed technical discussion. Please don't include confidential drawings in this form.",
}

export default function Contact() {
  return (
    <Sheet doc="WEB-100">
      <section><span className="eyebrow">Start a project</span><h1>Tell us about your device</h1><p className="lead">We reply within <span className="ph">[2]</span> business days. We sign an NDA before any detailed technical discussion. Please don&apos;t include confidential drawings in this form.</p></section>
      <section>
        <ContactForm />
      </section>
      <section className="split">
        <div className="cell"><span className="eyebrow">Business development</span><p><span className="ph">[email@company.com]</span><br/><span className="ph">[+00 000 000 0000]</span></p></div>
        <div className="cell"><span className="eyebrow">Facility address</span><p><span className="ph">[Street, City, Postcode, Country]</span></p></div>
      </section>
    </Sheet>
  )
}
