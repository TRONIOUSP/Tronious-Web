import type { Metadata } from 'next'
import Sheet from '@/components/Sheet'

export const metadata: Metadata = {
  title: 'Device Expertise | [Company Name]',
  description:
    'We focus on five device families. That focus means fewer surprises in testing, faster submissions and manufacturing processes already proven on similar products.',
}

export default function Expertise() {
  return (
    <Sheet doc="WEB-020">
      <section><span className="eyebrow">Device expertise</span><h1>Specialists in physical therapy and recovery devices</h1><p className="lead">We focus on five device families. That focus means fewer surprises in testing, faster submissions and manufacturing processes already proven on similar products.</p></section>
      <section>
        <div className="tablewrap"><table>
          <thead><tr><th>Device family</th><th>Typical engineering challenges</th><th>Key standards we design to</th></tr></thead>
          <tbody>
            <tr><td><b>Spinal traction</b><br/>Cervical and lumbar tables, controllers</td><td>Accurate force control and measurement, patient-release and emergency stop, motor safety</td><td>IEC 60601-1, IEC 60601-1-2, IEC 62304, ISO 14971</td></tr>
            <tr><td><b>Knee traction &amp; rehab</b><br/>Distraction, CPM, rehab devices</td><td>Range-of-motion limits, joint alignment across patient sizes, repeatable load profiles</td><td>IEC 60601-1, IEC 62366-1, ISO 14971</td></tr>
            <tr><td><b>Pneumatic compression</b><br/>Sequential pumps and garments</td><td>Pressure accuracy per chamber, leak detection, over-pressure protection, garment durability</td><td>IEC 60601-1, IEC 60601-1-11, ISO 10993 for garments</td></tr>
            <tr><td><b>Massage &amp; non-pneumatic compression</b><br/>Percussive, vibration, mechanical</td><td>Vibration and noise, battery safety, handheld ergonomics, motor life</td><td>IEC 60601-1 or IEC 60335 as applicable, IEC 62133-2 for batteries</td></tr>
            <tr><td><b>Thermal therapy</b><br/>Heat, cold and contrast</td><td>Surface temperature limits, independent thermal cut-offs, uniform heating</td><td>IEC 80601-2-35, IEC 60601-1-11</td></tr>
            <tr><td><b>Connected &amp; wearable</b><br/>App-controlled and body-worn versions of the above</td><td>Battery life, Bluetooth reliability, cybersecurity, skin-contact materials, comfort</td><td>IEC 62304, IEC 81001-5-1, IEC 60601-1-11, ISO 10993 series, radio approvals</td></tr>
          </tbody>
        </table></div>
        <p style={{ fontSize: '.88rem', color: 'var(--muted)' }}>Your RA team should confirm the standards list for each device. Applicable standards depend on intended use and classification.</p>
      </section>
      <section>
        <h2>Home-use and clinical devices</h2>
        <div className="split">
          <div className="cell"><h3>Clinical devices</h3><p>For chiropractors, physical therapists and clinics. Designed for continuous duty, cleaning between patients, and professional-use labeling.</p></div>
          <div className="cell"><h3>Home-use devices</h3><p>For patients and athletes. Designed to IEC 60601-1-11 for the home environment, with lay-user usability validation.</p></div>
        </div>
      </section>
    </Sheet>
  )
}
