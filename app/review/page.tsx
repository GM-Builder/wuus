import { Suspense } from "react";
import { MarketingShell, StudioAvatar } from "@/components/marketing/shell";
import { ReviewForm } from "@/components/marketing/review-form";
import s from "@/components/marketing/marketing.module.css";
export default function ReviewLandingPage() {
  return (
    <MarketingShell review>
      <main id="main" className={`${s.container} ${s.reviewMain}`}>
        <div className={s.hero}>
          <p className={s.eyebrow}>Free one-page website review</p>
          <h1>
            A guest&apos;s first impression.
            <br />
            <span className={s.soft}>A practical second opinion.</span>
          </h1>
          <p className={s.heroCopy}>
            See what could be clearer on your property&apos;s website or
            listing. Receive a short, personal review by email within two
            working days.
          </p>
          <p className={s.caption}>
            No payment. No obligation to start a project.
          </p>
        </div>
        <div className={s.reviewLayout}>
          <aside className={s.reviewInfo}>
            <h2>What you receive</h2>
            {[
              [
                "Three observations",
                "A look at the mobile layout, room information and the path to a direct enquiry.",
              ],
              [
                "One practical improvement",
                "A specific next step you can act on, with or without a new website.",
              ],
              [
                "A personal email",
                "A one-page note, reviewed by the person who would build your website.",
              ],
            ].map(([title, body]) => (
              <div className={s.feature} key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
            <StudioAvatar />
            <p className={s.hint}>
              WUUS · Independent web studio
              <br />
              Based in Jakarta, working remotely.
            </p>
          </aside>
          <Suspense
            fallback={
              <div className={s.formCard} role="status">
                Loading the review form…
              </div>
            }
          >
            <ReviewForm />
          </Suspense>
        </div>
      </main>
    </MarketingShell>
  );
}
