import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Legal | [Company Name]',
}

export default function Legal() {
  return (
    <Sheet doc="WEB-120" sheetTitle="Privacy, terms and cookies">
      <section><span className="eyebrow">Legal</span><h1>Privacy, terms and cookies</h1><div className="note">Have your legal counsel write these. Because you target EU buyers, the privacy policy must meet GDPR, and the cookie banner must ask consent before non-essential cookies load.</div></section>
      <section><h2>Privacy policy</h2><p>Covers what data the contact form collects, why, how long you keep it, who you share it with, and how people can request deletion. Must cover GDPR (EU), the Australian Privacy Act and applicable US state laws.</p></section>
      <section><h2>Terms of use</h2><p>Website use terms, disclaimers, and governing law.</p></section>
      <section><h2>Cookie policy</h2><p>List of cookies and analytics tools used, with a consent mechanism.</p></section>
      <section><h2>Accessibility statement</h2><p>Your commitment to accessible design and a contact for accessibility issues.</p></section>
    </Sheet>
  )
}
