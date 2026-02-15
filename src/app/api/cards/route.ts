import { NextResponse } from "next/server";
import { createCard, type CardRecord, type CardColor, type CardModel } from "@/lib/storage";
import { makeId } from "@/lib/id";

export const runtime = "nodejs";

type CreateBody = {
  fullName: string;
  company?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  telegram?: string;
  model: CardModel;
  color: CardColor;
  photoDataUrl?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as CreateBody;

  if (!body.fullName || body.fullName.trim().length < 2) {
    return NextResponse.json({ error: "fullName zorunlu" }, { status: 400 });
  }

  const id = makeId(10);

  const card: CardRecord = {
    id,
    createdAt: new Date().toISOString(),
    fullName: body.fullName.trim(),
    company: body.company?.trim() || "",
    title: body.title?.trim() || "",
    phone: body.phone?.trim() || "",
    email: body.email?.trim() || "",
    website: body.website?.trim() || "",
    whatsapp: body.whatsapp?.trim() || "",
    telegram: body.telegram?.trim() || "",
    model: body.model,
    color: body.color,
    photoDataUrl: body.photoDataUrl || "",
  };

  await createCard(card);

  return NextResponse.json({ id });
}