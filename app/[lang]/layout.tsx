import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/i18n/dictionaries';
import { locales } from '@/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { I18nProvider } from '@/lib/i18n/provider';
import './globals.css';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return {
    // hreflang exige URL absoluta (Google valida full-qualified); o SITE_URL é
    // a origem pública do site (definido no deploy). O x-default aponta para o
    // locale padrão — padrão de mercado para sets hreflang.
    metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
    title: {
      default: dict.site.name,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.tagline,
    openGraph: {
      title: dict.site.name,
      description: dict.site.tagline,
      locale: lang === 'pt-BR' ? 'pt_BR' : 'en_US',
      type: 'website',
    },
    alternates: {
      languages: {
        'pt-BR': '/pt-BR',
        en: '/en',
        'x-default': '/pt-BR',
      },
    },
  };
}

const TYPEKIT_ID = process.env.NEXT_PUBLIC_TYPEKIT_ID;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full" suppressHydrationWarning>
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <I18nProvider dict={dict} locale={lang}>
          <Header locale={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} />
        </I18nProvider>
      </body>
    </html>
  );
}