export type DeviceFamily = {
  id: string
  icon: 'spinal' | 'knee' | 'pneumatic' | 'massage' | 'thermal' | 'connected'
  name: string
  examples: string
  challenges: string
  standards: string[]
}

export const DEVICE_FAMILIES: DeviceFamily[] = [
  {
    id: 'spinal',
    icon: 'spinal',
    name: 'Spinal traction',
    examples: 'Cervical and lumbar tables, controllers',
    challenges:
      'Accurate force control and measurement, patient-release and emergency stop, motor safety',
    standards: ['IEC 60601-1', 'IEC 60601-1-2', 'IEC 62304', 'ISO 14971'],
  },
  {
    id: 'knee',
    icon: 'knee',
    name: 'Knee traction & rehab',
    examples: 'Distraction, CPM, rehab devices',
    challenges:
      'Range-of-motion limits, joint alignment across patient sizes, repeatable load profiles',
    standards: ['IEC 60601-1', 'IEC 62366-1', 'ISO 14971'],
  },
  {
    id: 'pneumatic',
    icon: 'pneumatic',
    name: 'Pneumatic compression',
    examples: 'Sequential pumps and garments',
    challenges:
      'Pressure accuracy per chamber, leak detection, over-pressure protection, garment durability',
    standards: ['IEC 60601-1', 'IEC 60601-1-11', 'ISO 10993 for garments'],
  },
  {
    id: 'massage',
    icon: 'massage',
    name: 'Massage & non-pneumatic compression',
    examples: 'Percussive, vibration, mechanical',
    challenges: 'Vibration and noise, battery safety, handheld ergonomics, motor life',
    standards: [
      'IEC 60601-1 or IEC 60335 as applicable',
      'IEC 62133-2 for batteries',
    ],
  },
  {
    id: 'thermal',
    icon: 'thermal',
    name: 'Thermal therapy',
    examples: 'Heat, cold and contrast',
    challenges: 'Surface temperature limits, independent thermal cut-offs, uniform heating',
    standards: ['IEC 80601-2-35', 'IEC 60601-1-11'],
  },
  {
    id: 'connected',
    icon: 'connected',
    name: 'Connected & wearable',
    examples: 'App-controlled and body-worn versions of the above',
    challenges:
      'Battery life, Bluetooth reliability, cybersecurity, skin-contact materials, comfort',
    standards: [
      'IEC 62304',
      'IEC 81001-5-1',
      'IEC 60601-1-11',
      'ISO 10993 series',
      'Radio approvals',
    ],
  },
]
