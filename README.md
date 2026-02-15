# NFC Kartvizit Stüdyosu

Next.js App Router + TypeScript + Tailwind + Prisma (SQLite) ile geliştirilmiş ticari NFC kartvizit sipariş sistemi.

## Kurulum

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## ENV

```env
DATABASE_URL="file:./prisma/dev.db"
DEFAULT_LOCALE="ru"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin12345"
# ADMIN_PASSWORD_HASH="bcrypt-hash"
```

## Kullanım

- Kullanıcı akışı:
  - `/ru` landing
  - `/ru/create` kart tasarım + bilgiler + canlı önizleme
  - `/ru/checkout` müşteri/teslimat + ödeme yöntemi + mock ödeme
  - `/ru/order/success?orderId=...`
- Dijital kart görünümü: `/ru/a/[cardId]`

## Admin

- Login: `/admin/login`
- Panel: `/admin`
- Siparişler: `/admin/orders`
- Ayarlar (fiyat + ödeme yöntemleri): `/admin/settings`

Varsayılan ödeme yöntemleri seed ile yüklenir:
1. Оплата переводом
2. Наличные

## Notlar

- Veritabanı Prisma ile tasarlanmıştır, ileride `datasource` değiştirilerek Postgres'e taşınabilir.
- Ödeme için `src/lib/payment/adapter.ts` içinde provider entegrasyon noktası ayrılmıştır.
- Fotoğraf client-side resize edilir, maksimum ~300KB hedeflenir.
