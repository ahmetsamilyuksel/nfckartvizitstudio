import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="brand-title">NFC Kartvizit Stüdyosu</div>
          <div className="brand-sub">NFC → Link → Profesyonel Kart → Tek tık .VCF</div>
        </div>
        <Link className="badge" href="/create">➕ Kart Oluştur</Link>
      </div>

      <div className="panel card">
        <h1 className="h1">Başlangıç</h1>
        <p className="p">
          /create sayfasından kartını oluştur. NFC etiketine sadece oluşan linki yaz.
          Link açılınca büyük “Добавить в контакты / Rehbere ekle” butonu ile .vcf indirilecek/açılacak.
        </p>

        <hr className="hr" />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn" href="/create">Kart Oluştur</Link>
          <span className="badge">Demo storage: data/cards.json</span>
          <span className="badge">API Key yok</span>
        </div>
      </div>
    </div>
  );
}