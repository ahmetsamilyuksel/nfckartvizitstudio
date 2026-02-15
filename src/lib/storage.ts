import fs from "fs/promises";
import path from "path";

export type CardModel = "minimal" | "wave" | "premium";
export type CardColor = "turquoise" | "navy" | "graphite";

export type CardRecord = {
  id: string;
  createdAt: string;

  fullName: string;
  company?: string;
  title?: string;
  phone?: string;    // E.164 öneri: +7..., +90...
  email?: string;
  website?: string;

  whatsapp?: string; // link veya numara
  telegram?: string; // link veya username

  model: CardModel;
  color: CardColor;

  photoDataUrl?: string; // "data:image/jpeg;base64,..."
};

const DATA_FILE = path.join(process.cwd(), "data", "cards.json");

async function readAll(): Promise<CardRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CardRecord[];
    return [];
  } catch {
    return [];
  }
}

async function writeAll(cards: CardRecord[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(cards, null, 2), "utf8");
}

export async function createCard(card: CardRecord): Promise<void> {
  const all = await readAll();
  all.unshift(card);
  await writeAll(all);
}

export async function getCard(id: string): Promise<CardRecord | null> {
  const all = await readAll();
  return all.find((c) => c.id === id) ?? null;
}