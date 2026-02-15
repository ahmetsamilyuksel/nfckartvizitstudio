import "./globals.css";

export const metadata = {
  title: "NFC Kartvizit Stüdyosu",
  description: "NFC link + vCard (.vcf) ile dijital kartvizit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}