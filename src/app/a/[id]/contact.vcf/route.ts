import { NextResponse } from "next/server";
import { getCard } from "@/lib/storage";
import { buildVCardV3 } from "@/lib/vcard";

export const runtime = "nodejs";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const card = await getCard(id);
  if (!card) {
    return new NextResponse("not found", { status: 404 });
  }

  const vcf = buildVCardV3(card);

  return new NextResponse(vcf, {
    status: 200,
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": `attachment; filename="contact-${id}.vcf"`,
      "cache-control": "no-store",
    },
  });
}