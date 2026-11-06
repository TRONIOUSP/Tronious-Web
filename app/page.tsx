import type { Metadata } from "next";
import Link from "next/link";
import heroImage from "@/public/images/therapy-device-development.png";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import MediaPanel from "@/components/ui/MediaPanel";
import DeviceFamilyIcon from "@/components/figures/DeviceFamilyIcon";
import ConceptFlow from "@/components/figures/ConceptFlow";

export const metadata: Metadata = {
  title: "Home | TRONIOUS",
  description:
    "We take traction, compression, massage and thermal therapy devices from first sketch to production, ready for the US, EU and Australian markets.",
};

const CERTS = [
  "ISO 13485:2016",
  "MDSAP",
  "FDA Registered Facility",
  "QMSR · 21 CFR 820",
  "EU MDR",
  "TGA",
  "IEC 60601-1",
];

const FAMILIES = [
  {
    family: "spinal" as const,
    name: "Spinal traction",
    desc: "Cervical and lumbar tables, force controllers",
  },
  {
    family: "knee" as const,
    name: "Knee traction & rehab",
    desc: "Distraction, CPM and rehab devices",
  },
  {
    family: "pneumatic" as const,
    name: "Pneumatic compression",
    desc: "Sequential pumps and multi-chamber garments",
  },
  {
    family: "massage" as const,
    name: "Massage & mechanical compression",
    desc: "Percussive, vibration and mechanical",
  },
  {
    family: "thermal" as const,
    name: "Thermal therapy",
    desc: "Heat, cold and contrast therapy",
  },
];

const ENGINEERING = [
  {
    title: "Mechanical & pneumatic",
    desc: "Frames, enclosures, bladders, garments",
  },
  {
    title: "PCB & electronics",
    desc: "Isolation, motor and heater control, EMC",
  },
  { title: "Embedded firmware", desc: "IEC 62304 control and safety software" },
  { title: "Mobile apps", desc: "iOS and Android, BLE, cybersecurity" },
  { title: "Wearables", desc: "Body-worn compression and heat" },
  { title: "Test equipment", desc: "V&V rigs and end-of-line testers" },
];

export default function Home() {
  return (
    <>
      {/* Hero — band tone */}
      <Section tone="band" data-doc="WEB-001" className="hero-section">
        <div data-hero-grid="">
          <div data-hero-copy="">
            <Reveal>
              <span data-eyebrow="">
                Contract design &amp; manufacturing · Therapy and recovery
                devices
              </span>
              <h1>
                Your device.{" "}
                <span data-hero-hl="">Designed, cleared and built</span> by one
                team.
              </h1>
              <p data-hero-lead="">
                We take traction, compression, massage and thermal therapy
                devices from first sketch to production, ready for the US, EU
                and Australian markets.
              </p>
              <div data-btns="">
                <Button href="/contact" variant="primary" size="lg">
                  Start a project
                </Button>
                <Button href="/process" variant="ghost" size="lg">
                  How we work
                </Button>
              </div>
              <ul data-markets="" aria-label="Markets">
                <li>
                  <b>US</b> FDA 510(k)
                </li>
                <li>
                  <b>EU</b> MDR 2017/745
                </li>
                <li>
                  <b>AU</b> TGA · ARTG
                </li>
              </ul>
            </Reveal>
          </div>
          <div data-hero-figure="">
            <MediaPanel
              src={heroImage}
              alt="Illustrative therapy-device development scene with a compression controller, garment, electronics and enclosure components"
              eyebrow="Concept to production"
              caption="Engineering, regulatory and manufacturing in one development loop"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Certifications — sunken tone */}
      <Section tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Certified to the standards your buyers check first"
            title=""
            align="center"
          />
          <div data-badges="">
            {CERTS.map((cert) => (
              <Badge key={cert}>{cert}</Badge>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Device families — default tone */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Device expertise"
            title="Five device families. Nothing else."
            lead="Focus means our test plans, suppliers and production lines are already proven on devices like yours."
          />
        </Reveal>
        <div data-fam-grid="">
          {FAMILIES.map(({ family, name, desc }, i) => (
            <Reveal key={family} delay={i * 60}>
              <Link href="/expertise" data-fam-card="">
                <DeviceFamilyIcon family={family} data-fam-icon="" />
                <h3>{name}</h3>
                <p>{desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engineering disciplines — sunken tone */}
      <Section tone="sunken">
        <Reveal>
          <SectionHead
            eyebrow="Engineering under one roof"
            title="Every discipline your device needs"
          />
        </Reveal>
        <div data-cap-grid="">
          {ENGINEERING.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 50}>
              <Link href="/engineering" data-cap-item="">
                <b>{title}</b>
                <span>{desc}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process flow — band tone */}
      <Section tone="band">
        <Reveal>
          <SectionHead
            eyebrow="One partner, start to finish"
            title="From concept to shipped units"
          />
        </Reveal>
        <ConceptFlow />
        <Reveal delay={200}>
          <Link href="/process" data-more-link="">
            See every phase and its deliverables →
          </Link>
        </Reveal>
      </Section>

      {/* Stats — default tone */}
      {/* <Section>
        <Reveal>
          <SectionHead
            eyebrow="Track record"
            title="Numbers that matter to a device brand"
          />
        </Reveal>
        <div data-stats-grid="">
          <Reveal delay={0}>
            <Stat value={<Ph>[XX]</Ph>} label="Regulatory submissions supported" />
          </Reveal>
          <Reveal delay={60}>
            <Stat value={<Ph>[XX]</Ph>} label="Devices in commercial production" />
          </Reveal>
          <Reveal delay={120}>
            <Stat value={<Ph>[XX] mo</Ph>} label="Average concept to clearance" />
          </Reveal>
          <Reveal delay={180}>
            <Stat value={<Ph>[XXk]</Ph>} label="Units shipped per year" />
          </Reveal>
        </div>
      </Section> */}

      {/* Project principles — sunken tone */}
      <Section tone="sunken">
        <div data-project-principles="">
          <Reveal>
            <div data-project-principles-copy="">
              <SectionHead
                eyebrow="Built for confident decisions"
                title="A clear path through a complex device launch"
                lead="You do not need vague promises. You need visibility into what is being decided, why it matters and what comes next."
              />
              <Link href="/quality" data-more-link="">
                See how quality is built in →
              </Link>
            </div>
          </Reveal>

          <ol aria-label="How TRONIOUS keeps projects controlled">
            <Reveal as="li" delay={60}>
              <span aria-hidden="true">01</span>
              <div>
                <h3>Decisions at the right time</h3>
                <p>
                  Review scope, risk, evidence and cost before each major
                  commitment.
                </p>
              </div>
            </Reveal>
            <Reveal as="li" delay={120}>
              <span aria-hidden="true">02</span>
              <div>
                <h3>One connected development loop</h3>
                <p>
                  Engineering, regulatory and manufacturing choices stay
                  aligned from prototype to production.
                </p>
              </div>
            </Reveal>
            <Reveal as="li" delay={180}>
              <span aria-hidden="true">03</span>
              <div>
                <h3>Documentation that moves with the product</h3>
                <p>
                  Design history, test evidence and production knowledge are
                  organized for the next stage—not left behind at handoff.
                </p>
              </div>
            </Reveal>
          </ol>
        </div>
      </Section>

      {/* Closing CTA — band tone */}
      <Section tone="band">
        <Reveal>
          <div data-cta-end="">
            <h2>
              Have a device idea, or a design that needs a new manufacturer?
            </h2>
            <p data-hero-lead="">
              Tell us your stage. We reply within 2 business days and sign an
              NDA before any technical discussion.
            </p>
            <div data-btns="">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <Button href="/engagement" variant="ghost" size="lg">
                Engagement models
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
