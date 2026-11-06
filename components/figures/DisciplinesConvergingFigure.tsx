'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { shouldAnimate } from '@/components/ui/Reveal'

const DISCIPLINES = [
  {
    short: 'ME', label: 'Mechanical & pneumatic', title: 'Mechanical & pneumatic design',
    lead: 'Structures that carry traction loads safely, enclosures that survive clinic cleaning, and pneumatic systems that hold pressure for years.',
    href: '/engineering#e-mech', x: 260, y: 44, labelX: 260, labelY: 10,
  },
  {
    short: 'EE', label: 'PCB & electronics', title: 'PCB & electronics design',
    lead: 'Circuits designed from the first schematic to pass IEC 60601 electrical safety and EMC testing, not fixed after they fail.',
    href: '/engineering#e-pcb', x: 407, y: 96, labelX: 445, labelY: 75,
  },
  {
    short: 'FW', label: 'Embedded firmware', title: 'Embedded firmware',
    lead: 'Control software for force, pressure and temperature, built to the IEC 62304 medical software lifecycle with safety designed in.',
    href: '/engineering#e-fw', x: 407, y: 216, labelX: 444, labelY: 260,
  },
  {
    short: 'APP', label: 'Connected apps', title: 'Mobile apps & connected devices',
    lead: 'Companion apps that run therapy programs, track compliance and connect clinicians to patients, with cybersecurity documented for your submission.',
    href: '/engineering#e-app', x: 260, y: 268, labelX: 260, labelY: 310,
  },
  {
    short: 'WR', label: 'Wearable devices', title: 'Wearable therapy devices',
    lead: 'Compact, battery-powered compression, heat and vibration devices that people wear during daily life or recovery.',
    href: '/engineering#e-wear', x: 113, y: 216, labelX: 75, labelY: 260,
  },
  {
    short: 'TEST', label: 'Test systems', title: 'Test equipment & fixture design',
    lead: 'We design the rigs that prove your device works during development, and the testers that check every unit in production.',
    href: '/engineering#e-test', x: 113, y: 96, labelX: 75, labelY: 75,
  },
]

const CENTER = { x: 260, y: 156 }

export default function DisciplinesConvergingFigure({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [arrived, setArrived] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (!shouldAnimate()) return
    const element = wrapRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setArrived(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldAnimate() || hasInteracted) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % DISCIPLINES.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [hasInteracted])

  function select(index: number) {
    setActiveIndex(index)
    setHasInteracted(true)
  }

  const active = DISCIPLINES[activeIndex]

  return (
    <div ref={wrapRef} data-disciplines-converging-wrap="" data-arrived={arrived ? '' : undefined} className={className}>
      <div data-discipline-status="">
        <span>Integrated development system</span>
        <span><i aria-hidden="true" /> Six disciplines connected</span>
      </div>

      <div data-discipline-stage="">
        <svg viewBox="0 0 520 320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-disciplines-converging="">
          <defs>
            <radialGradient id="discipline-core-fill">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="discipline-signal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-signal)" />
              <stop offset="1" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>

          <ellipse data-discipline-orbit="" cx="260" cy="156" rx="166" ry="112" />
          <circle data-discipline-orbit-inner="" cx="260" cy="156" r="76" />
          <circle data-discipline-orbit-arc="" cx="260" cy="156" r="132" pathLength="100" />

          {DISCIPLINES.map((discipline, index) => (
            <line key={`line-${discipline.short}`} data-discipline-line="" data-active={activeIndex === index ? '' : undefined} x1={discipline.x} y1={discipline.y} x2={CENTER.x} y2={CENTER.y} pathLength="100" style={{ '--arrive-delay': `${index * 70}ms` } as CSSProperties} />
          ))}

          <g data-discipline-core="">
            <circle data-core-aura="" cx={CENTER.x} cy={CENTER.y} r="66" fill="url(#discipline-core-fill)" />
            <circle data-core-pulse="" cx={CENTER.x} cy={CENTER.y} r="48" />
            <rect x="224" y="111" width="72" height="90" rx="16" />
            <rect x="233" y="120" width="54" height="58" rx="9" />
            <path d="M244 188h32" />
            <circle cx="260" cy="188" r="2" fill="currentColor" stroke="none" />
            <text x="260" y="145" textAnchor="middle" stroke="none" fill="currentColor">ONE</text>
            <text x="260" y="159" textAnchor="middle" stroke="none" fill="currentColor">TEAM</text>
            <text data-core-caption="" x="260" y="219" textAnchor="middle" stroke="none" fill="currentColor">DEVICE CORE</text>
          </g>

          {DISCIPLINES.map((discipline, index) => (
            <g key={discipline.short} data-discipline-node="" data-active={activeIndex === index ? '' : undefined} style={{ '--arrive-delay': `${index * 70}ms` } as CSSProperties} onPointerEnter={() => select(index)} onClick={() => select(index)}>
              <circle data-discipline-node-halo="" cx={discipline.x} cy={discipline.y} r="36" />
              <circle data-discipline-circle="" cx={discipline.x} cy={discipline.y} r="28" />
              <circle data-discipline-dot="" cx={discipline.x + 21} cy={discipline.y - 19} r="3" />
              <text data-discipline-short="" x={discipline.x} y={discipline.y + 3} textAnchor="middle" stroke="none" fill="currentColor">{discipline.short}</text>
              <text data-discipline-label="" x={discipline.labelX} y={discipline.labelY} textAnchor="middle" stroke="none" fill="currentColor">{discipline.label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div data-discipline-dock="">
        <div id="discipline-detail" role="tabpanel" aria-labelledby={`discipline-tab-${activeIndex}`} data-discipline-detail="">
          <span data-discipline-index="">0{activeIndex + 1} / 06</span>
          <div>
            <h3>{active.title}</h3>
            <p>{active.lead}</p>
            <Link href={active.href}>Explore this discipline <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div role="tablist" aria-label="Engineering disciplines" data-discipline-tabs="">
          {DISCIPLINES.map((discipline, index) => (
            <button key={discipline.short} id={`discipline-tab-${index}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls="discipline-detail" title={discipline.title} onClick={() => select(index)}>
              <span>{discipline.short}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
