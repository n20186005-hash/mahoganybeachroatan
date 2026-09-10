import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://mahoganybeachroatan.com';
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const esUrl = `${baseUrl}/es/cookie-settings`;
  const selfUrl = locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : esUrl;
  const label = messages?.cookieSettings?.title || 'Cookie Settings';
  const title = `${label} | ${messages?.hero?.title || 'Mahogany Bay Cruise Terminal'}`;

  return {
    title,
    description: label,
    alternates: {
      canonical: selfUrl,
      languages: {
        'es': esUrl,
        'zh': zhUrl,
        'en': enUrl,
        'x-default': esUrl,
      },
    },
    openGraph: {
      title,
      description: label,
      url: selfUrl,
      siteName: messages?.hero?.title || 'Mahogany Bay Cruise Terminal',
      type: 'website',
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
