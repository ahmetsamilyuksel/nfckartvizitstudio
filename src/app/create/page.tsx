import Link from "next/link";
import CreateForm from "@/components/CreateForm";

export default function CreatePage() {
  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="brand-title">NFC Kartvizit Stüdyosu</div>
          <div className="brand-sub">/create</div>
        </div>
        <Link className="badge" href="/">⬅️ Ana Sayfa</Link>
      </div>

      <div className="grid">
        <CreateForm />
        <div className="panel card">
          <h2 className="h1" style={{ fontSize: 18 }}>iPhone / Android davranışı</h2>
          <p className="p">
            Rehbere “tam otomatik” kaydetme yok.
            En fazla tek tıkla .VCF açtırırız, kullanıcı “Ekle” diye onaylar.
            Bu yüzden NFC’ye vCard değil, sadece link yazıyoruz.
          </p>

          <hr className="hr" />

          <div className="badge">NFC yöntemi: NDEF → URL</div>
          <div style={{ height: 10 }} />
          <div className="badge">Prod’da kalıcı DB: Turso / KV / Supabase</div>
        </div>
      </div>
    </div>
  );
}