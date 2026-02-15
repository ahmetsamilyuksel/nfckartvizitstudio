"use client";

import { useMemo, useState } from "react";

type Model = "minimal" | "wave" | "premium";
type Color = "turquoise" | "navy" | "graphite";

type FormState = {
  fullName: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  telegram: string;
  model: Model;
  color: Color;
  photoDataUrl: string;
};

export default function CreateForm() {
  const [loading, setLoading] = useState(false);
  const [createdId, setCreatedId] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const [s, setS] = useState<FormState>({
    fullName: "",
    company: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    whatsapp: "",
    telegram: "",
    model: "minimal",
    color: "turquoise",
    photoDataUrl: "",
  });

  const link = useMemo(() => {
    if (!createdId) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/a/${createdId}`;
  }, [createdId]);

  async function onPickPhoto(file: File | null) {
    if (!file) return;
    const maxBytes = 900 * 1024;
    if (file.size > maxBytes) {
      setErr("Foto büyük. Daha küçük bir foto seç (yaklaşık < 900KB).");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setS((p) => ({ ...p, photoDataUrl: dataUrl }));
  }

  async function submit() {
    setErr("");
    setCreatedId("");

    if (!s.fullName.trim()) {
      setErr("Ad Soyad zorunlu.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: s.fullName,
          company: s.company,
          title: s.title,
          phone: s.phone,
          email: s.email,
          website: s.website,
          whatsapp: s.whatsapp,
          telegram: s.telegram,
          model: s.model,
          color: s.color,
          photoDataUrl: s.photoDataUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Hata oluştu");
        return;
      }

      setCreatedId(data.id);
    } catch {
      setErr("Ağ hatası / server hatası.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    alert("Kopyalandı: " + link);
  }

  return (
    <div className="panel card">
      <h1 className="h1">/create — Kart Oluştur</h1>
      <p className="p">
        Foto yükle + bilgileri gir + 3 model & 3 renk seç → sistem tek bir kart linki üretsin.
        NFC etikete sadece bu link yazılacak.
      </p>

      <div className="form">
        <div className="row2">
          <label className="label">
            Ad Soyad (zorunlu)
            <input className="input" value={s.fullName} onChange={(e) => setS((p) => ({ ...p, fullName: e.target.value }))} />
          </label>

          <label className="label">
            Fotoğraf (demo: base64 JSON'a yazılır)
            <input className="input" type="file" accept="image/*" onChange={(e) => onPickPhoto(e.target.files?.[0] ?? null)} />
          </label>
        </div>

        <div className="row2">
          <label className="label">
            Şirket
            <input className="input" value={s.company} onChange={(e) => setS((p) => ({ ...p, company: e.target.value }))} />
          </label>

          <label className="label">
            Ünvan
            <input className="input" value={s.title} onChange={(e) => setS((p) => ({ ...p, title: e.target.value }))} />
          </label>
        </div>

        <div className="row2">
          <label className="label">
            Telefon (E.164 öneri: +7..., +90...)
            <input className="input" placeholder="+79001234567" value={s.phone} onChange={(e) => setS((p) => ({ ...p, phone: e.target.value }))} />
          </label>

          <label className="label">
            Email
            <input className="input" placeholder="info@saelacons.ru" value={s.email} onChange={(e) => setS((p) => ({ ...p, email: e.target.value }))} />
          </label>
        </div>

        <div className="row2">
          <label className="label">
            Website
            <input className="input" placeholder="saelacons.ru" value={s.website} onChange={(e) => setS((p) => ({ ...p, website: e.target.value }))} />
          </label>

          <label className="label">
            WhatsApp (numara veya link)
            <input className="input" placeholder="+79001234567" value={s.whatsapp} onChange={(e) => setS((p) => ({ ...p, whatsapp: e.target.value }))} />
          </label>
        </div>

        <div className="row2">
          <label className="label">
            Telegram (@username veya link)
            <input className="input" placeholder="@saela" value={s.telegram} onChange={(e) => setS((p) => ({ ...p, telegram: e.target.value }))} />
          </label>

          <label className="label">
            Renk (3 adet)
            <select className="select" value={s.color} onChange={(e) => setS((p) => ({ ...p, color: e.target.value as Color }))}>
              <option value="turquoise">turquoise</option>
              <option value="navy">navy</option>
              <option value="graphite">graphite</option>
            </select>
          </label>
        </div>

        <label className="label">
          Tasarım Modeli (3 adet)
          <select className="select" value={s.model} onChange={(e) => setS((p) => ({ ...p, model: e.target.value as Model }))}>
            <option value="minimal">Model-1: Minimal</option>
            <option value="wave">Model-2: Wave/Curve</option>
            <option value="premium">Model-3: Premium Dark</option>
          </select>
        </label>

        {err ? <div className="badge" style={{ borderColor: "rgba(255,80,80,.35)", color: "rgba(255,200,200,.9)" }}>⚠️ {err}</div> : null}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
          <button className="btn" disabled={loading} onClick={submit}>
            {loading ? "Oluşturuluyor..." : "Kart Linki Oluştur"}
          </button>
          {createdId ? (
            <>
              <button className="btn2" onClick={copyLink}>Linki Kopyala</button>
              <a className="btn2" href={`/a/${createdId}`} target="_blank" rel="noreferrer">Kartı Aç</a>
            </>
          ) : null}
        </div>

        {createdId ? (
          <div className="smallNote">
            NFC’ye yazılacak URL: <b>{link}</b>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("file read error"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}