'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import DeviceFamilyIcon from '@/components/figures/DeviceFamilyIcon'
import Badge from '@/components/ui/Badge'
import type { DeviceFamily } from '@/lib/device-expertise'

export default function DeviceFamilyExplorer({ families }: { families: DeviceFamily[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeFamily = families[activeIndex]

  function select(index: number) {
    setActiveIndex(index)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % families.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + families.length) % families.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = families.length - 1
    }

    if (nextIndex !== undefined) {
      event.preventDefault()
      select(nextIndex)
    }
  }

  return (
    <div data-device-explorer="">
      <div role="tablist" aria-label="Device families" data-device-tabs="">
        {families.map((family, index) => (
          <button
            key={family.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            id={`device-tab-${family.id}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`device-panel-${family.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span data-device-tab-number="">{String(index + 1).padStart(2, '0')}</span>
            <DeviceFamilyIcon family={family.icon} className="h-9 w-9" />
            <span data-device-tab-name="">{family.name}</span>
          </button>
        ))}
      </div>

      <div
        id={`device-panel-${activeFamily.id}`}
        role="tabpanel"
        aria-labelledby={`device-tab-${activeFamily.id}`}
        tabIndex={0}
        data-device-panel=""
      >
        <div data-device-panel-intro="">
          <span data-eyebrow="">Selected family</span>
          <h3>{activeFamily.name}</h3>
          <p>{activeFamily.examples}</p>
        </div>
        <div data-device-panel-detail="">
          <div>
            <span data-device-detail-label="">Engineering focus</span>
            <p>{activeFamily.challenges}</p>
          </div>
          <div>
            <span data-device-detail-label="">Standards starting point</span>
            <div className="flex flex-wrap gap-2">
              {activeFamily.standards.map((standard) => (
                <Badge key={standard}>{standard}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
