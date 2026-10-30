'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      id="rfq"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="row2">
        <label htmlFor="f-name">
          Name
          <input id="f-name" required />
        </label>
        <label htmlFor="f-company">
          Company
          <input id="f-company" required />
        </label>
      </div>
      <div className="row2">
        <label htmlFor="f-email">
          Work email
          <input id="f-email" type="email" required />
        </label>
        <label htmlFor="f-country">
          Country
          <input id="f-country" />
        </label>
      </div>
      <div className="row2">
        <label htmlFor="f-type">
          Device type
          <select id="f-type">
            <option>Spinal traction</option>
            <option>Knee traction / rehab</option>
            <option>Pneumatic compression</option>
            <option>Massage / non-pneumatic compression</option>
            <option>Thermal therapy</option>
            <option>Other</option>
          </select>
        </label>
        <label htmlFor="f-stage">
          Project stage
          <select id="f-stage">
            <option>Idea / concept</option>
            <option>Prototype</option>
            <option>Design complete, not cleared</option>
            <option>Cleared, need a manufacturer</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend>Target markets</legend>
        <label htmlFor="m-us">
          <input type="checkbox" id="m-us" /> United States
        </label>
        <label htmlFor="m-eu">
          <input type="checkbox" id="m-eu" /> European Union
        </label>
        <label htmlFor="m-au">
          <input type="checkbox" id="m-au" /> Australia
        </label>
        <label htmlFor="m-ot">
          <input type="checkbox" id="m-ot" /> Other
        </label>
      </fieldset>
      <div className="row2">
        <label htmlFor="f-vol">
          Expected annual volume
          <select id="f-vol">
            <option>Under 1,000</option>
            <option>1,000–10,000</option>
            <option>10,000–50,000</option>
            <option>Over 50,000</option>
          </select>
        </label>
        <label htmlFor="f-time">
          Target launch
          <input id="f-time" placeholder="e.g. Q3 2027" />
        </label>
      </div>
      <label htmlFor="f-msg">
        Project description
        <textarea id="f-msg" placeholder="What the device does, who uses it, and what you need from us" />
      </label>
      <label htmlFor="f-nda" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 400 }}>
        <input type="checkbox" id="f-nda" style={{ width: 'auto' }} /> Send me your mutual NDA first
      </label>
      <div className="btns">
        <button className="btn primary" type="submit">
          Send inquiry
        </button>
      </div>
      <p id="formMsg" className="note" hidden={!submitted}>
        This is a preview form. When the site goes live, your developer connects it to your email or CRM.
      </p>
    </form>
  )
}
