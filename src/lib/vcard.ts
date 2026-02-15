import type { CardRecord } from "./storage";

function clean(s?: string): string {
  if (!s) return "";
  return String(s).replace(/\r?\n/g, " ").trim();
}

export function buildVCardV3(card: CardRecord): string {
  const fullName = clean(card.fullName);
  const [first, ...rest] = fullName.split(" ").filter(Boolean);
  const last = rest.join(" ");

  const lines: string[] = [];
  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");
  lines.push(`N:${clean(last)};${clean(first)};;;`);
  lines.push(`FN:${fullName}`);

  if (card.company) lines.push(`ORG:${clean(card.company)}`);
  if (card.title) lines.push(`TITLE:${clean(card.title)}`);

  if (card.phone) lines.push(`TEL;TYPE=CELL:${clean(card.phone)}`);
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${clean(card.email)}`);
  if (card.website) lines.push(`URL:${clean(card.website)}`);

  const extras: string[] = [];
  if (card.whatsapp) extras.push(`WhatsApp: ${clean(card.whatsapp)}`);
  if (card.telegram) extras.push(`Telegram: ${clean(card.telegram)}`);
  if (extras.length) lines.push(`NOTE:${extras.join(" | ")}`);

  lines.push("END:VCARD");
  return lines.join("\r\n") + "\r\n";
}