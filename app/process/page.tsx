import type { Metadata } from 'next'
import Link from 'next/link'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Process | [Company Name]',
  description:
    'Six phases, each closed by a gate review that you approve. Nothing moves forward on assumptions, and every phase produces documentation that goes straight into your design history file.',
}

export default function Process() {
  return (
    <Sheet doc="WEB-030" sheetTitle="Phase-gated, with a deliverable at every gate">
      <section><span className="eyebrow">Development process</span><h1>Phase-gated, with a deliverable at every gate</h1><p className="lead">Six phases, each closed by a gate review that you approve. Nothing moves forward on assumptions, and every phase produces documentation that goes straight into your design history file.</p></section>
      <section>
        <ol className="steps">
          <li><div><h3>Concept &amp; feasibility</h3><span className="dur">Typically <span className="ph">[4–8 weeks]</span></span>
            <p>We work out what the device must do, who uses it, and whether it can be built and cleared at your target cost.</p>
            <ul className="ticks"><li>User needs and intended use statement</li><li>Device classification and regulatory pathway for US, EU and Australia, including predicate search for a 510(k)</li><li>Competitor and patent landscape review</li><li>Proof-of-concept prototypes for the riskiest functions</li><li>Target cost, budget and timeline</li></ul>
            <span className="deliv">Gate 1 deliverables: feasibility report, regulatory strategy, project plan and quote</span></div></li>
          <li><div><h3>Design inputs &amp; planning</h3><span className="dur">Typically <span className="ph">[3–6 weeks]</span></span>
            <p>User needs become measurable engineering requirements, and the risk management file starts.</p>
            <ul className="ticks"><li>System, hardware, firmware and app requirements</li><li>Risk management plan and initial hazard analysis to ISO 14971</li><li>Applicable standards list and test plan outline</li><li>Usability plan and user profiles to IEC 62366-1</li></ul>
            <span className="deliv">Gate 2 deliverables: design and development plan, requirements specifications, risk management plan</span></div></li>
          <li><div><h3>Detailed design</h3><span className="dur">Typically <span className="ph">[3–9 months]</span></span>
            <p>Mechanical, electronics, firmware and app engineering run in parallel, in short build-and-test iterations.</p>
            <ul className="ticks"><li>Two or three prototype rounds, from works-like to looks-like to production-intent</li><li>Design reviews at each iteration, with independent reviewers</li><li>EMC and electrical safety pre-compliance testing on prototypes</li><li>Formative usability studies with real clinicians or users</li><li>Design FMEA and updated risk analysis</li><li>Supplier selection and tooling for moulded parts</li></ul>
            <span className="deliv">Gate 3 deliverables: frozen design, drawings, BOM, firmware release candidate, design review records</span></div></li>
          <li><div><h3>Verification &amp; validation</h3><span className="dur">Typically <span className="ph">[2–4 months]</span></span>
            <p>We prove the design meets every requirement (verification) and meets users&apos; needs (validation).</p>
            <ul className="ticks"><li>Third-party IEC 60601-1, 60601-1-2 and collateral standard testing at an accredited lab</li><li>Performance and endurance testing on our in-house rigs</li><li>Software verification and cybersecurity testing</li><li>Biocompatibility evaluation for patient-contact materials</li><li>Summative usability validation</li><li>Packaging and transit testing</li></ul>
            <span className="deliv">Gate 4 deliverables: test reports, traceability matrix, risk management report, usability engineering file</span></div></li>
          <li><div><h3>Regulatory submission</h3><span className="dur">Review times set by each regulator</span>
            <p>We prepare the submission content. Your company, as legal manufacturer, submits to the FDA, your notified body and the TGA, and we support you through questions.</p>
            <ul className="ticks"><li>510(k) content, with FDA eSTAR formatting</li><li>EU MDR technical documentation and GSPR checklist</li><li>Support for your Australian sponsor&apos;s ARTG application</li><li>Labeling, IFU and UDI data</li><li>Responses to regulator questions and deficiency letters</li></ul>
            <span className="deliv">Gate 5 deliverables: submission-ready documentation, labeling set</span></div></li>
          <li><div><h3>Design transfer &amp; production</h3><span className="dur">Typically <span className="ph">[2–3 months]</span></span>
            <p>The verified design becomes a validated production process, then scales to volume.</p>
            <ul className="ticks"><li>Device master record, supplier approvals and first article inspection</li><li>Process validation and test method validation</li><li>Pilot lots, then ramp to volume production</li></ul>
            <span className="deliv">Gate 6 deliverables: validated processes, first production lot. <Link href="/manufacturing">Full manufacturing details →</Link></span></div></li>
        </ol>
      </section>
      <section><div className="note">Our quality system follows ISO 13485:2016 and FDA&apos;s Quality Management System Regulation (QMSR, 21 CFR 820), which took effect in February 2026. Timelines are typical ranges and depend on device complexity and classification.</div></section>
    </Sheet>
  )
}
