import Link from "next/link";
import CardPreview from "@/components/CardPreview";
import type { CardRecord } from "@/lib/storage";

async function fetchCard(id: string): Promise<CardRecord | null> {
  try {
    const res = await fetch(`/api/cards/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as CardRecord;
  } catch {
    return null;
  }
}

export default async function CardPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const card = await fetchCard(id);

  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="brand-title">Dijital Kart</div>
          <div className="brand-sub">/a/{id}</div>
        </div>
        <Link className="badge" href="/create">➕ Yeni Kart</Link>
      </div>

      {!card ? (
        <div className="panel card">
          <h1 className="h1">Kart bulunamadı</h1>
          <p className="p">Bu ID ile kayıt yok. Demo storage: data/cards.json</p>
        </div>
      ) : (
        <div className="panel">
          <CardPreview card={card} />
        </div>
      )}
    </div>
  );
}