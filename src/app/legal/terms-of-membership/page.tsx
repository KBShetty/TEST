import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: `Terms of Membership | ${siteConfig.name}`,
  description: `Membership terms for ${siteConfig.name} (draft — pending review).`,
};

export default function TermsOfMembershipPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-400">
        This is a draft policy pending review and confirmation by{" "}
        {siteConfig.name}.
      </div>

      <h1 className="text-3xl font-bold tracking-tight">
        Terms of Membership
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: placeholder — to be set once these terms are finalized.
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. Membership Agreement
          </h2>
          <p className="mt-2">
            By joining {siteConfig.name}, you agree to abide by these terms,
            our facility rules, and any applicable membership plan details
            communicated to you at signup.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. Billing & Payment
          </h2>
          <p className="mt-2">
            Membership fees are billed according to the plan selected at
            signup (e.g. monthly). Specific billing dates, payment methods,
            and any applicable taxes will be confirmed at the time of
            enrollment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. Cancellation Policy
          </h2>
          <p className="mt-2">
            Members may request cancellation of their membership by
            providing notice as outlined in their membership agreement.
            Cancellation terms (notice period, effective date, etc.) will be
            confirmed at enrollment and may vary by plan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Refund Policy
          </h2>
          <p className="mt-2">
            Refund eligibility, if any, depends on the specific membership
            plan and timing of the request. Please contact our team to
            discuss refund requests on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Membership Freeze
          </h2>
          <p className="mt-2">
            Members may request a temporary freeze of their membership (for
            example, due to travel, illness, or injury). Freeze duration
            limits and any associated fees will be confirmed by our team
            upon request.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Facility Rules & Conduct
          </h2>
          <p className="mt-2">
            Members are expected to follow posted facility rules, respect
            staff and other members, and use equipment safely and as
            instructed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            7. Assumption of Risk
          </h2>
          <p className="mt-2">
            Physical exercise carries inherent risk. Members participate in
            all classes, training sessions, and use of equipment at their
            own risk and are encouraged to consult a physician before
            beginning any new fitness program.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            8. Changes to These Terms
          </h2>
          <p className="mt-2">
            We may update these terms from time to time. Any changes will be
            posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            9. Contact Us
          </h2>
          <p className="mt-2">
            For questions about your membership terms, please reach us at{" "}
            {siteConfig.email} or {siteConfig.phone}.
          </p>
        </section>
      </div>
    </div>
  );
}
