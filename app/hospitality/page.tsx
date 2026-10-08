import Link from "next/link";
import { MarketingShell, StudioAvatar } from "@/components/marketing/shell";
import { Examples } from "@/components/marketing/examples";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { ServiceIcon } from "@/components/marketing/service-icon";
import { SalesHero } from "@/components/marketing/sales-hero";
import s from "@/components/marketing/marketing.module.css";

const questions = [
  [
    "Does this replace my booking engine?",
    "The website can link to the booking engine you already use. The standard packages do not include live availability, reservation processing or guest payments.",
  ],
  [
    "What if I don’t have a website?",
    "Share a link to your Booking.com listing, Google Maps profile or Instagram page. The review will focus on the information guests can find and how they can contact you.",
  ],
  [
    "How long does a project take?",
    "Starter is estimated at 5–7 working days after the deposit is received and approved materials are complete. A Showcase schedule is agreed in the proposal. Feedback delays or new scope can change the schedule.",
  ],
  [
    "Can I edit the website myself?",
    "Self-service editing and a CMS are not included in the standard packages. Content updates can be quoted separately, or an editing system can be scoped before work begins.",
  ],
  [
    "Who owns the website?",
    "After final payment, you receive the agreed source code, content and handover guide. Domain and hosting accounts should be in your control. Third-party assets keep their own licences.",
  ],
  [
    "What happens after launch?",
    "The standard proposal includes 14 days of support for bugs against the agreed scope. New content, features and ongoing maintenance are quoted separately.",
  ],
];
const steps = [
  [
    "Review",
    "Share your property link. Receive a one-page note with practical improvements.",
  ],
  [
    "Agree the scope",
    "Approve the pages, features, price, schedule and payment terms before paying a deposit.",
  ],
  [
    "Build and refine",
    "Once the deposit and materials are complete, review a private preview. Two consolidated revision rounds are included.",
  ],
  [
    "Launch and handover",
    "Approve the final site and pay the balance. Receive your source code, access and a short guide.",
  ],
];

export default function HospitalityPage() {
  return (
    <MarketingShell>
      <main id="main">
        <SalesHero />
        <div className={`${s.container} ${s.proofLine}`}>
          <span>Designed for mobile</span>
          <span>Written scope and fixed price</span>
          <span>Preview before final payment</span>
          <span>Source code handover</span>
        </div>
        <section id="build" className={`${s.container} ${s.section}`}>
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>The essentials, done carefully</p>
            <h2>
              Everything a guest
              <br />
              needs to take the next step.
            </h2>
          </div>
          <div className={s.three}>
            {[
              [
                "Your rooms, clearly presented.",
                "Show room types, amenities and photos in a layout that works on a phone.",
              ],
              [
                "A direct way to reach you.",
                "Send guests to your email, WhatsApp or existing booking engine with a clear next step.",
              ],
              [
                "A website you can keep.",
                "Separate project code, a private preview and a practical handover when the work is complete.",
              ],
            ].map(([title, body], index) => (
              <article className={s.feature} key={title}>
                <ServiceIcon
                  kind={
                    index === 0
                      ? "layout"
                      : index === 1
                        ? "message"
                        : "handover"
                  }
                  className={s.serviceIcon}
                />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="examples" className={`${s.section} ${s.blueSection}`}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <p className={s.eyebrow}>Design examples</p>
              <h2>
                Different places.
                <br />
                Their own character.
              </h2>
              <p>
                Explore three fictional properties to see the layouts and
                enquiry flows. These are design concepts, with AI-generated
                imagery, rather than completed client projects.
              </p>
            </div>
            <Examples />
          </div>
        </section>
        <section
          id="process"
          className={`${s.container} ${s.section} ${s.split}`}
        >
          <div>
            <p className={s.eyebrow}>How we work</p>
            <h2>
              Clear steps.
              <br />
              One point of contact.
            </h2>
            <p>
              Work directly with the designer building your website. Review
              progress through email and a private preview, at a time that suits
              your property.
            </p>
            <div className={s.processPhoto} aria-hidden="true" />
            <p className={s.storyCaption}>
              Illustrative scene generated with AI.
            </p>
          </div>
          <ol className={s.steps}>
            {steps.map(([title, body], index) => (
              <li key={title}>
                <span className={s.number}>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section id="pricing" className={`${s.section} ${s.wash}`}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <p className={s.eyebrow}>Website packages</p>
              <h2>
                A clear scope.
                <br />A clear starting price.
              </h2>
              <p>
                Introductory rates for the first two signed website projects.
                The written proposal confirms your scope and total cost.
              </p>
            </div>
            <div className={s.prices}>
              <article className={`${s.priceCard} ${s.priceFeatured}`}>
                <h3>Starter</h3>
                <p className={s.priceIntro}>
                  A focused first website for your property.
                </p>
                <div className={s.price}>€390</div>
                <p className={s.priceNote}>
                  Introductory project price · 50% deposit
                </p>
                <ul>
                  <li>One English page, up to six sections</li>
                  <li>Up to six room types and 20 photos</li>
                  <li>Gallery, amenities, location and enquiry links</li>
                  <li>Link to your existing booking engine</li>
                  <li>Two revision rounds and source handover</li>
                </ul>
                <a href="#review" className={s.button}>
                  Discuss Starter
                </a>
              </article>
              <article className={s.priceCard}>
                <h3>Showcase</h3>
                <p className={s.priceIntro}>
                  More room for your rooms and local story.
                </p>
                <div className={s.price}>€590</div>
                <p className={s.priceNote}>
                  Introductory project price · 50% deposit
                </p>
                <ul>
                  <li>Up to five English pages</li>
                  <li>Up to ten room types; photo scope agreed</li>
                  <li>Room pages, gallery and local information</li>
                  <li>Direct enquiry and booking engine links</li>
                  <li>Two revision rounds and source handover</li>
                </ul>
                <a href="#review" className={s.buttonLight}>
                  Discuss Showcase
                </a>
              </article>
            </div>
            <p className={s.smallPrint}>
              You provide approved text and photos you have permission to use.
              Domain, commercial hosting, translations, CMS and ongoing
              maintenance are quoted separately. Booking engines, guest payments
              and live AI are outside these packages. Any applicable taxes and
              the payable total are specified before a deposit. The balance is
              due after preview approval, before launch and handover.{" "}
              <Link href="/hospitality/terms">Read the project terms</Link>.
            </p>
          </div>
        </section>
        <section id="about" className={`${s.section} ${s.darkSection}`}>
          <div className={s.about}>
            <StudioAvatar />
            <div>
              <p className={s.eyebrow}>About WUUS</p>
              <h2>
                An independent studio.
                <br />
                Personal attention to your website.
              </h2>
              <p>
                WUUS is a one-person web design studio based in Jakarta,
                Indonesia, working remotely with independent properties. You
                work directly with the person responsible for the design and
                build.
              </p>
              <p>
                Written updates and a private preview keep the work clear across
                time zones. Your scope, schedule and costs are agreed before
                production starts.
              </p>
              <a href="mailto:hallo@webuntukusaha.com" className={s.textLink}>
                hallo@webuntukusaha.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section id="faq" className={`${s.container} ${s.section} ${s.split}`}>
          <div>
            <p className={s.eyebrow}>Before you begin</p>
            <h2>A few useful answers.</h2>
          </div>
          <div className={s.faq}>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="review" className={`${s.section} ${s.contactSection}`}>
          <div className={`${s.container} ${s.split}`}>
            <div>
              <p className={s.eyebrow}>Start with a conversation</p>
              <h2>
                Let&apos;s look at
                <br />
                your property online.
              </h2>
              <p>
                Ask for a free one-page review or discuss a website project.
                Share your property link and receive a personal reply by email
                within two working days.
              </p>
              <p className={s.smallPrint}>
                The review covers the mobile layout, room information and direct
                enquiry path. It includes three observations and one practical
                next step.
              </p>
              <a href="mailto:hallo@webuntukusaha.com" className={s.textLink}>
                Prefer email? Contact WUUS <span aria-hidden="true">↗</span>
              </a>
            </div>
            <InquiryForm source="hospitality" />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
