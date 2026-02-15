import type { CardRecord } from "@/lib/storage";

function colorToAccent(color: CardRecord["color"]) {
  if (color === "turquoise") return "var(--turquoise)";
  if (color === "navy") return "var(--navy)";
  return "var(--graphite)";
}

export default function CardPreview({ card }: { card: CardRecord }) {
  const accent = colorToAccent(card.color);

  const topStyle: React.CSSProperties =
    card.model === "premium"
      ? {
          background:
            `linear-gradient(135deg, rgba(0,0,0,.35), rgba(255,255,255,.06)), radial-gradient(900px 400px at 20% 0%, ${accent}33, transparent 60%)`,
          borderBottom: "1px solid rgba(255,255,255,.14)",
        }
      : card.model === "wave"
      ? {
          background:
            `radial-gradient(900px 500px at 10% 0%, ${accent}33, transparent 60%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))`,
          borderBottom: "1px solid rgba(255,255,255,.14)",
        }
      : {
          background:
            `radial-gradient(900px 500px at 10% 0%, ${accent}22, transparent 60%), rgba(255,255,255,.04)`,
          borderBottom: "1px solid rgba(255,255,255,.14)",
        };

  const frameStyle: React.CSSProperties =
    card.model === "premium"
      ? {
          border: `1px solid ${accent}55`,
          boxShadow: "0 20px 70px rgba(0,0,0,.45)",
        }
      : {};

  return (
    <div className="kartWrap">
      <div className="kartBox" style={frameStyle}>
        <div className="kartTop" style={topStyle}>
          <div className="avatar" style={{ outline: `2px solid ${accent}33` }}>
            {card.photoDataUrl ? <img src={card.photoDataUrl} alt="avatar" /> : <span>📷</span>}
          </div>
          <div>
            <p className="name">{card.fullName}</p>
            <p className="meta">
              {card.title ? card.title : "—"} {card.company ? `• ${card.company}` : ""}
            </p>
            <p className="meta">
              {card.phone ? card.phone : ""} {card.email ? `• ${card.email}` : ""}
            </p>
          </div>
        </div>

        <div className="kartMid">
          <a className="bigCTA" href={`/a/${card.id}/contact.vcf`}>
            Добавить в контакты / Rehbere ekle
          </a>

          <div className="linksRow">
            {card.whatsapp ? (
              <a className="linkBtn" target="_blank" rel="noreferrer" href={normalizeWhatsApp(card.whatsapp)}>
                🟢 WhatsApp
              </a>
            ) : null}

            {card.telegram ? (
              <a className="linkBtn" target="_blank" rel="noreferrer" href={normalizeTelegram(card.telegram)}>
                ✈️ Telegram
              </a>
            ) : null}

            {card.website ? (
              <a className="linkBtn" target="_blank" rel="noreferrer" href={normalizeUrl(card.website)}>
                🌐 Website
              </a>
            ) : null}

            {card.email ? (
              <a className="linkBtn" href={`mailto:${card.email}`}>
                ✉️ Email
              </a>
            ) : null}

            {card.phone ? (
              <a className="linkBtn" href={`tel:${card.phone}`}>
                📞 Phone
              </a>
            ) : null}
          </div>

          <div className="smallNote">
            iOS/Android kuralı: Rehbere “tam otomatik” eklenmez. Bu buton .VCF indirir/açar ve kullanıcı onaylar.
          </div>
        </div>
      </div>
    </div>
  );
}

function normalizeUrl(s: string) {
  const t = s.trim();
  if (!t) return "#";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return "https://" + t;
}

function normalizeTelegram(s: string) {
  const t = s.trim();
  if (!t) return "#";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("@")) return "https://t.me/" + t.slice(1);
  return "https://t.me/" + t;
}

function normalizeWhatsApp(s: string) {
  const t = s.trim();
  if (!t) return "#";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  const digits = t.replace(/[^\d+]/g, "");
  const n = digits.startsWith("+") ? digits.slice(1) : digits;
  return "https://wa.me/" + n;
}