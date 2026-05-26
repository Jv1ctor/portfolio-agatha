import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    locale: "pt_BR",
    type: "website",
  },
};

const TYPEKIT_ID = process.env.NEXT_PUBLIC_TYPEKIT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        {/* Adobe Fonts (Typekit) — define NEXT_PUBLIC_TYPEKIT_ID em .env.local
            com o ID do kit. Sem essa variável, o site cai no fallback
            web-safe definido em globals.css. */}
        {TYPEKIT_ID ? (
          <>
            <link rel="preconnect" href="https://use.typekit.net" />
            <link
              rel="stylesheet"
              href={`https://use.typekit.net/${TYPEKIT_ID}.css`}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
