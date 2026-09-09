import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy for ${siteConfig.name} (draft — pending review).`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-400">
        This is a draft policy pending review and confirmation by{" "}
        {siteConfig.name}.
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: placeholder — to be set once this policy is finalized.
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p className="mt-2">
            When you submit an inquiry, request a free trial, or contact us
            through a form on this website, we collect the information you
            provide directly, which may include your name, phone number,
            email address, and any message or preferences you share with us
            (such as your preferred contact time or the program you&apos;re
            interested in).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p className="mt-2">
            We use the information you provide to respond to your inquiry,
            follow up about memberships, trials, classes, or offers, and to
            contact you via phone, WhatsApp, or email as indicated by your
            submission. We do not sell your personal information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. How We Store and Protect Your Information
          </h2>
          <p className="mt-2">
            Submitted information is stored securely and is accessible only
            to authorized staff for the purpose of responding to your
            inquiry and managing your membership, where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Third-Party Services
          </h2>
          <p className="mt-2">
            We may use third-party tools (such as messaging, email, or
            spreadsheet services) solely to help us receive and respond to
            your inquiry. These providers only process data as needed to
            deliver that functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Your Choices
          </h2>
          <p className="mt-2">
            You may ask us to update or delete the information we hold about
            you at any time by contacting us using the details on our{" "}
            <a href="/contact" className="underline">
              Contact page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this policy from time to time. Any changes will be
            posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            7. Contact Us
          </h2>
          <p className="mt-2">
            If you have questions about this policy, please reach us at{" "}
            {siteConfig.email} or {siteConfig.phone}.
          </p>
        </section>
      </div>
    </div>
  );
}
