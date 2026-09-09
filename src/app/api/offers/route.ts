import { NextResponse } from "next/server";
import { z } from "zod";
import { readOffers, writeOffers, isOfferActive } from "@/lib/offers-store";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Offer } from "@/types/content";

const offerSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  discount: z.string().min(1),
  validFrom: z.string().min(1),
  validTo: z.string().min(1),
  image: z.string().min(1),
  active: z.boolean(),
});

// GET is public — the Offers page needs to list active offers.
export async function GET() {
  const offers = await readOffers();
  const active = offers.filter((o) => isOfferActive(o));
  return NextResponse.json({ offers: active });
}

// POST replaces the whole offers list — protected by the admin session
// cookie set via /api/admin/login.
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = z.array(offerSchema).safeParse(body?.offers);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid offers payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await writeOffers(parsed.data as Offer[]);
  return NextResponse.json({ ok: true });
}
