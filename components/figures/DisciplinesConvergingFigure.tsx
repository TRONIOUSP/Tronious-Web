'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { shouldAnimate } from '@/components/ui/Reveal'

/**
 * A decorative illustration for the about page's "one team" claim: the six
 * engineering disciplines converging on a single device. The discipline names
 * and `lead` copy match the engineering page's own descriptions verbatim (not
 * reworded here), so the card content never drifts from what that page says.
 *
 * Nodes swing into place (rotating around the center, staggered) the first
 * time the figure scrolls into view, then hovering, focusing or tapping a
 * node opens a detail card with that discipline's description and a link to
 * its section on the engineering page.
 */
const DISCIPLINES = [
  {
    label: 'Mechanical & pneumatic design',
    lead: 'Structures that carry traction loads safely, enclosures that survive clinic cleaning, and pneumatic systems that hold pressure for years.',
    href: '/engineering#e-mech',
    x: 200,
    y: 60,
    labelDy: -30,
  },
  {
    label: 'PCB & electronics design',
    lead: 'Circuits designed from the first schematic to pass IEC 60601 electrical safety and EMC testing, not fixed after they fail.',
    href: '/engineering#e-pcb',
    x: 295,
    y: 115,
    labelDy: -30,
  },
  {
    label: 'Embedded firmware',
    lead: 'Control software for force, pressure and temperature, built to the IEC 62304 medical software lifecycle with safety designed in.',
    href: '/engineering#e-fw',
    x: 295,
    y: 225,
    labelDy: 34,
  },
  {
    label: 'Mobile apps & connected devices',
    lead: 'Companion apps that run therapy programs, track compliance and connect clinicians to patients, with cybersecurity documented for your submission.',
    href: '/engineering#e-app',
    x: 200,
    y: 280,
    labelDy: 34,
  },
  {
    label: 'Wearable therapy devices',
    lead: 'Compact, battery-powered compression, heat and vibration devices that people wear during daily life or recovery.',
    href: '/engineering#e-wear',
    x: 105,
    y: 225,
    labelDy: 34,
  },
  {
    label: 'Test equipment & fixture design',
    lead: 'We design the rigs that prove your device works during development, and the testers that check every unit in production.',
    href: '/engineering#e-test',
    x: 105,
    y: 115,
    labelDy: -30,
  },
]

const CENTER = { x: 200, y: 170 }
const VIEWBOX = { width: 400, height: 340 }

export default function DisciplinesConvergingFigure({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [arrived, setArrived] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [cardOpen, setCardOpen] = useState(false)

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

  function open(i: number) {
    setCardIndex(i)
    setCardOpen(true)
  }
  function close() {
    setCardOpen(false)
  }
  function toggle(i: number) {
    if (cardOpen && cardIndex === i) {
      close()
    } else {
      open(i)
    }
  }

  const card = DISCIPLINES[cardIndex]

  return (
    <div
      ref={wrapRef}
      data-disciplines-converging-wrap=""
      data-arrived={arrived ? '' : undefined}
      className={className}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        data-disciplines-converging=""
      >
        {DISCIPLINES.map((d) => (
          <line
            key={`line-${d.label}`}
            data-discipline-line=""
            x1={d.x}
            y1={d.y}
            x2={CENTER.x}
            y2={CENTER.y}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
        ))}

        {/* Converged device at the center */}
        <rect
          x={CENTER.x - 26}
          y={CENTER.y - 34}
          width="52"
          height="68"
          rx="8"
          strokeWidth="1.5"
        />
        <line
          x1={CENTER.x - 16}
          y1={CENTER.y + 20}
          x2={CENTER.x + 16}
          y2={CENTER.y + 20}
          strokeWidth="1.5"
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 2}
          textAnchor="middle"
          fontSize="10"
          stroke="none"
          fill="currentColor"
        >
          Device
        </text>

        {DISCIPLINES.map((d, i) => (
          <g
            key={d.label}
            data-discipline-node=""
            data-active={cardOpen && cardIndex === i ? '' : undefined}
            tabIndex={0}
            role="button"
            aria-label={`${d.label}: ${d.lead}`}
            style={
              {
                transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
                '--arrive-delay': `${i * 70}ms`,
                '--arrive-sign': i % 2 === 0 ? 1 : -1,
              } as CSSProperties
            }
            onPointerEnter={() => open(i)}
            onPointerLeave={close}
            onFocus={() => open(i)}
            onBlur={close}
            onClick={() => toggle(i)}
          >
            <circle
              data-discipline-hit=""
              cx={d.x}
              cy={d.y}
              r="26"
              fill="transparent"
              stroke="none"
            />
            <circle data-discipline-circle="" cx={d.x} cy={d.y} r="22" strokeWidth="1.5" />
            <text
              x={d.x}
              y={d.y + d.labelDy}
              textAnchor="middle"
              fontSize="9"
              stroke="none"
              fill="currentColor"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>

      <div
        data-discipline-card=""
        data-open={cardOpen ? '' : undefined}
        style={
          {
            left: `${(card.x / VIEWBOX.width) * 100}%`,
            top: `${(card.y / VIEWBOX.height) * 100}%`,
          } as CSSProperties
        }
        onPointerEnter={() => setCardOpen(true)}
        onPointerLeave={close}
      >
        <p data-discipline-card-title="">{card.label}</p>
        <p data-discipline-card-lead="">{card.lead}</p>
        <Link href={card.href} data-discipline-card-link="">
          See how we do it →
        </Link>
      </div>
    </div>
  )
}
