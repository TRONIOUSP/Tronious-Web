import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Note from '@/components/ui/Note'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import LegalStructureFigure from '@/components/figures/LegalStructureFigure'

export const metadata: Metadata = {
  title: 'Legal & privacy | TRONIOUS',
  description: 'TRONIOUS website privacy, terms of use, cookie and accessibility information.',
}

export default function Legal() {
  return (
    <>
      <Section tone="band" data-doc="WEB-120">
        <div data-page-hero-layout="">
          <Reveal>
            <div>
              <SectionHead
                as="h1"
                eyebrow="Legal & privacy"
                title="Clear policies, in plain language"
                lead="How this website handles information, the terms that apply when you use it, and the choices available to you."
              />
              <p data-policy-updated="">Last updated · 6 November 2026</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div data-hero-figure-frame="">
              <LegalStructureFigure />
              <p data-hero-figure-caption="">Choose a policy to move directly to that section.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <div data-legal-intro="">
            <SectionHead
              eyebrow="Policy center"
              title="What you need to know"
              lead="These policies describe the current TRONIOUS website experience and are written to be easy to scan."
            />
            <Note>
              Before production launch, company details, service providers, data-retention periods
              and governing law should be confirmed by legal counsel.
            </Note>
          </div>
        </Reveal>
      </Section>

      <div data-legal-body="">
        <Section id="privacy" tone="sunken">
          <Reveal>
            <article data-policy-section="">
              <div data-policy-heading="">
                <span data-policy-number="">01</span>
                <SectionHead
                  title="Privacy policy"
                  lead="The information we may collect through this website, why we use it and the choices you have."
                />
              </div>
              <div data-policy-grid="">
                <div>
                  <h3>Information you provide</h3>
                  <p>
                    If you contact us, you may provide your name, company, work email, country and
                    project details. Please do not send patient information, health records or
                    other sensitive personal data through the website.
                  </p>
                </div>
                <div>
                  <h3>How we use it</h3>
                  <p>
                    We use inquiry information to respond, understand the requested work, arrange
                    follow-up and maintain reasonable business records. We do not sell personal
                    information submitted through the website.
                  </p>
                </div>
                <div>
                  <h3>Sharing and retention</h3>
                  <p>
                    Information may be handled by service providers supporting website hosting,
                    communications or business operations. We keep it only as long as reasonably
                    needed for the inquiry, legal obligations and legitimate records.
                  </p>
                </div>
                <div>
                  <h3>Your choices</h3>
                  <p>
                    Depending on where you live, you may be able to request access, correction or
                    deletion, or object to certain processing. Contact us with the email address
                    used in your inquiry so we can verify and respond to the request.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>

        <Section id="terms">
          <Reveal>
            <article data-policy-section="">
              <div data-policy-heading="">
                <span data-policy-number="">02</span>
                <SectionHead
                  title="Terms of use"
                  lead="The basic terms that apply when you browse or use this website."
                />
              </div>
              <div data-policy-grid="">
                <div>
                  <h3>Website information</h3>
                  <p>
                    Content is provided for general information. It is not legal, regulatory,
                    clinical or other professional advice and should not replace an assessment of
                    a specific device, market or set of facts.
                  </p>
                </div>
                <div>
                  <h3>Acceptable use</h3>
                  <p>
                    Do not misuse the website, interfere with its operation, attempt unauthorized
                    access, introduce malicious code or use its content in a way that infringes the
                    rights of TRONIOUS or others.
                  </p>
                </div>
                <div>
                  <h3>Intellectual property</h3>
                  <p>
                    Unless stated otherwise, the website design, text, graphics and other original
                    content belong to TRONIOUS or its licensors. No ownership rights transfer to a
                    visitor by using the website.
                  </p>
                </div>
                <div>
                  <h3>Availability and changes</h3>
                  <p>
                    We may update, suspend or remove website content. We aim for useful and accurate
                    information but do not promise that every page will always be complete,
                    current, uninterrupted or error-free.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>

        <Section id="cookies" tone="sunken">
          <Reveal>
            <article data-policy-section="">
              <div data-policy-heading="">
                <span data-policy-number="">03</span>
                <SectionHead
                  title="Cookie policy"
                  lead="A straightforward explanation of browser storage and how consent should work."
                />
              </div>
              <div data-policy-grid="">
                <div>
                  <h3>Essential storage</h3>
                  <p>
                    The website may use browser storage that is necessary to remember a choice you
                    make, such as the light or dark display theme, or to support security and basic
                    operation.
                  </p>
                </div>
                <div>
                  <h3>Analytics and marketing</h3>
                  <p>
                    Non-essential analytics or marketing technologies should not load until the
                    required consent has been collected. If they are introduced, this policy and
                    the consent controls must identify them clearly.
                  </p>
                </div>
                <div>
                  <h3>Managing choices</h3>
                  <p>
                    You can clear stored website data through your browser. Blocking essential
                    storage may prevent preferences from being remembered, but core website
                    information should remain available.
                  </p>
                </div>
                <div>
                  <h3>Policy updates</h3>
                  <p>
                    This section will be updated if the technologies used by the website change.
                    The date at the top of this page shows when the policy center was last revised.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>

        <Section id="accessibility">
          <Reveal>
            <article data-policy-section="">
              <div data-policy-heading="">
                <span data-policy-number="">04</span>
                <SectionHead
                  title="Accessibility statement"
                  lead="Our commitment to making the website usable by as many people as possible."
                />
              </div>
              <div data-policy-grid="">
                <div>
                  <h3>Our approach</h3>
                  <p>
                    We work to provide clear structure, readable contrast, keyboard access,
                    meaningful labels and support for reduced-motion preferences across the site.
                  </p>
                </div>
                <div>
                  <h3>Tell us about a barrier</h3>
                  <p>
                    If you cannot access information or complete an action, tell us which page and
                    what happened. We will review the issue and offer the information in another
                    practical format where possible.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>
      </div>

      <Section tone="band">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Reveal>
            <SectionHead
              as="h2"
              eyebrow="Questions or requests"
              title="Contact the TRONIOUS team"
              lead="Use the contact page for a privacy request, an accessibility issue or a question about these policies."
            />
          </Reveal>
          <Reveal delay={80}>
            <Button href="/contact" variant="primary" size="lg">
              Contact us
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
