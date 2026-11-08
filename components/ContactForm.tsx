'use client'

import { useRef, useState, type FormEvent } from 'react'
import Button from '@/components/ui/Button'
import Note from '@/components/ui/Note'

const fieldClass =
  'w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-[0.95rem] text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'
const labelClass = 'grid gap-1.5 text-[0.88rem] font-medium text-text-primary'
const row2Class = 'grid gap-4 sm:grid-cols-2'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const statusRef = useRef<HTMLParagraphElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('submitting')
    setMessage('Sending your inquiry…')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('company'),
          email: formData.get('email'),
          country: formData.get('country'),
          deviceType: formData.get('deviceType'),
          projectStage: formData.get('projectStage'),
          targetMarkets: formData.getAll('targetMarkets'),
          annualVolume: formData.get('annualVolume'),
          targetLaunch: formData.get('targetLaunch'),
          projectDescription: formData.get('projectDescription'),
          requestNda: formData.get('requestNda') === 'on',
          website: formData.get('website'),
        }),
      })

      const result = (await response.json().catch(() => null)) as { message?: unknown } | null
      const responseMessage =
        typeof result?.message === 'string' ? result.message : 'The inquiry could not be sent.'

      if (!response.ok) {
        throw new Error(responseMessage)
      }

      form.reset()
      setStatus('success')
      setMessage(responseMessage)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The inquiry could not be sent.')
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  return (
    <form
      id="rfq"
      className="grid max-w-[720px] gap-4"
      onSubmit={handleSubmit}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="f-website">
          Website
          <input
            id="f-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className={row2Class}>
        <label htmlFor="f-name" className={labelClass}>
          Name
          <input id="f-name" name="name" autoComplete="name" required className={fieldClass} />
        </label>
        <label htmlFor="f-company" className={labelClass}>
          Company
          <input
            id="f-company"
            name="company"
            autoComplete="organization"
            required
            className={fieldClass}
          />
        </label>
      </div>
      <div className={row2Class}>
        <label htmlFor="f-email" className={labelClass}>
          Work email
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </label>
        <label htmlFor="f-country" className={labelClass}>
          Country
          <input id="f-country" name="country" autoComplete="country-name" className={fieldClass} />
        </label>
      </div>
      <div className={row2Class}>
        <label htmlFor="f-type" className={labelClass}>
          Device type
          <select id="f-type" name="deviceType" className={fieldClass}>
            <option>Electrotherapy</option>
            <option>Photobiomodulation</option>
            <option>Pneumatic compression</option>
            <option>Massage / non-pneumatic compression</option>
            <option>Thermal therapy</option>
            <option>Other</option>
          </select>
        </label>
        <label htmlFor="f-stage" className={labelClass}>
          Project stage
          <select id="f-stage" name="projectStage" className={fieldClass}>
            <option>Idea / concept</option>
            <option>Prototype</option>
            <option>Design complete, not cleared</option>
            <option>Cleared, need a manufacturer</option>
          </select>
        </label>
      </div>
      <fieldset className="grid gap-2 rounded-md border border-border-default p-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
        <legend className="px-1 text-[0.88rem] font-medium text-text-primary">Target markets</legend>
        <label htmlFor="m-us" className="flex items-center gap-2 font-normal text-text-secondary">
          <input type="checkbox" id="m-us" name="targetMarkets" value="us" className="w-auto" /> United States
        </label>
        <label htmlFor="m-eu" className="flex items-center gap-2 font-normal text-text-secondary">
          <input type="checkbox" id="m-eu" name="targetMarkets" value="eu" className="w-auto" /> European Union
        </label>
        <label htmlFor="m-au" className="flex items-center gap-2 font-normal text-text-secondary">
          <input type="checkbox" id="m-au" name="targetMarkets" value="au" className="w-auto" /> Australia
        </label>
        <label htmlFor="m-ot" className="flex items-center gap-2 font-normal text-text-secondary">
          <input type="checkbox" id="m-ot" name="targetMarkets" value="other" className="w-auto" /> Other
        </label>
      </fieldset>
      <div className={row2Class}>
        <label htmlFor="f-vol" className={labelClass}>
          Expected annual volume
          <select id="f-vol" name="annualVolume" className={fieldClass}>
            <option>Under 1,000</option>
            <option>1,000–10,000</option>
            <option>10,000–50,000</option>
            <option>Over 50,000</option>
          </select>
        </label>
        <label htmlFor="f-time" className={labelClass}>
          Target launch
          <input id="f-time" name="targetLaunch" placeholder="e.g. Q3 2027" className={fieldClass} />
        </label>
      </div>
      <label htmlFor="f-msg" className={labelClass}>
        Project description
        <textarea
          id="f-msg"
          name="projectDescription"
          placeholder="What the device does, who uses it, and what you need from us"
          className={`${fieldClass} min-h-[110px] resize-y`}
        />
      </label>
      <label htmlFor="f-nda" className="flex items-center gap-2 font-normal text-text-secondary">
        <input type="checkbox" id="f-nda" name="requestNda" className="w-auto" /> Send me your mutual NDA first
      </label>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={status === 'submitting'} aria-describedby="formMsg">
          {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
        </Button>
      </div>
      <Note
        ref={statusRef}
        id="formMsg"
        hidden={status === 'idle'}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        tabIndex={-1}
      >
        {message}
      </Note>
    </form>
  )
}
