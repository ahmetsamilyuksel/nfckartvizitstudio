import { NextResponse } from "next/server";
import { getCard } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const card = await getCard(id);

  if (!card) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(card, { status: 200 });
}