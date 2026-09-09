import type { LeadFormValues } from "@/lib/validations";

interface LeadRecord extends Omit<LeadFormValues, "company"> {
  source: "popup" | "contact-page";
  submittedAt: string;
}

// Appends a row to a Google Sheet via a Google Apps Script "Web App" URL,
// and emails the gym owner via Resend. Both are best-effort: if an env var
// is missing (not configured yet), we log instead of throwing, so the form
// still "succeeds" for the user in dev/before the client's Sheet is wired up.
export async function deliverLead(lead: LeadRecord) {
  const results = await Promise.allSettled([
    sendToSheet(lead),
    sendEmailAlert(lead),
  ]);

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length === results.length) {
    // Both delivery paths failed — the caller should still not fail the
    // user's submission (WhatsApp handoff is the fallback), but this is
    // worth surfacing in server logs.
    console.error("[lead-delivery] both Sheet and email delivery failed", failures);
  }
}

async function sendToSheet(lead: LeadRecord) {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead-delivery] SHEET_WEBHOOK_URL not set — skipping Sheet log", lead);
    return;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Sheet webhook responded ${res.status}`);
}

async function sendEmailAlert(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.warn("[lead-delivery] RESEND_API_KEY/LEAD_NOTIFICATION_EMAIL not set — skipping email alert", lead);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Aurea Fitness Website <onboarding@resend.dev>",
    to,
    subject: `New lead: ${lead.name} (${lead.intent})`,
    text: [
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Intent: ${lead.intent}`,
      lead.preferredContactTime ? `Preferred time: ${lead.preferredContactTime}` : null,
      `Source: ${lead.source}`,
      `Submitted: ${lead.submittedAt}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
  if (error) throw error;
}
