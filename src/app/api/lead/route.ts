import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";
import { deliverLead } from "@/lib/lead-delivery";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Never trust client-side validation alone — re-validate the same schema
  // server-side.
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot: a filled "company" field means a bot filled every input.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const { name, phone, email, intent, preferredContactTime, consent } = parsed.data;

  await deliverLead({
    name,
    phone,
    email,
    intent,
    preferredContactTime,
    consent,
    source: body.source === "contact-page" ? "contact-page" : "popup",
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
