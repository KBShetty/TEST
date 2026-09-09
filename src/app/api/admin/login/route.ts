import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
