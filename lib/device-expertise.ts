export type DeviceFamily = {
  id: string;
  icon:
    | "electrotherapy"
    | "photobiomodulation"
    | "pneumatic"
    | "massage"
    | "thermal"
    | "connected";
  name: string;
  examples: string;
  challenges: string;
  standards: string[];
};

export const DEVICE_FAMILIES: DeviceFamily[] = [
  {
    id: "electrotherapy",
    icon: "electrotherapy",
    name: "Electrotherapy",
    examples: "TENS, EMS, NMES and interferential stimulators",
    challenges:
      "Constant-current output and waveform accuracy, electrode-contact monitoring, patient isolation and leakage limits",
    standards: [
      "IEC 60601-1",
      "IEC 60601-2-10",
      "IEC 60601-1-11",
      "IEC 62304",
      "ISO 14971",
    ],
  },
  {
    id: "photobiomodulation",
    icon: "photobiomodulation",
    name: "Photobio-modulation",
    examples: "Red and near-infrared LED and low-level laser devices",
    challenges:
      "Irradiance and dose accuracy, wavelength stability, skin-contact temperature limits, eye safety",
    standards: [
      "IEC 60601-1",
      "IEC 60601-2-57",
      "IEC 62471",
      "IEC 60825-1",
      "ISO 14971",
    ],
  },
  {
    id: "pneumatic",
    icon: "pneumatic",
    name: "Pneumatic compression",
    examples: "Sequential pumps and garments",
    challenges:
      "Pressure accuracy per chamber, leak detection, over-pressure protection, garment durability",
    standards: ["IEC 60601-1", "IEC 60601-1-11", "ISO 10993 for garments"],
  },
  {
    id: "massage",
    icon: "massage",
    name: "Massage & non-pneumatic compression",
    examples: "Percussive, vibration, mechanical",
    challenges:
      "Vibration and noise, battery safety, handheld ergonomics, motor life",
    standards: [
      "IEC 60601-1 or IEC 60335 as applicable",
      "IEC 62133-2 for batteries",
    ],
  },
  {
    id: "thermal",
    icon: "thermal",
    name: "Thermal therapy",
    examples: "Heat, cold and contrast",
    challenges:
      "Surface temperature limits, independent thermal cut-offs, uniform heating",
    standards: ["IEC 80601-2-35", "IEC 60601-1-11"],
  },
  {
    id: "connected",
    icon: "connected",
    name: "Connected & wearable",
    examples: "App-controlled and body-worn versions of the above",
    challenges:
      "Battery life, Bluetooth reliability, cybersecurity, skin-contact materials, comfort",
    standards: [
      "IEC 62304",
      "IEC 81001-5-1",
      "IEC 60601-1-11",
      "ISO 10993 series",
      "Radio approvals",
    ],
  },
];
