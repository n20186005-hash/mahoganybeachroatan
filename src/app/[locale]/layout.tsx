import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { BASE_URL, HERO_IMAGE_SRC } from '@/lib/site';
import PwaRegister from '@/components/PwaRegister';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: HERO_IMAGE_SRC, type: 'image/jpeg' }],
    apple: [{ url: HERO_IMAGE_SRC, type: 'image/jpeg' }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2d6375" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a1f28" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mahogany Bay" />
        {/* Google AdSense 代码将在获得发布商 ID 后再行接入 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Google Analytics 4: G-HXM22WWPKP（尊重用户 Cookie 偏好） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              (function () {
                var allowed = true;
                try {
                  var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null');
                  if (prefs && typeof prefs.analytics === 'boolean') {
                    allowed = prefs.analytics;
                  }
                } catch (e) {}
                if (allowed) {
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP';
                  document.head.appendChild(s);
                  gtag('js', new Date());
                  gtag('config', 'G-HXM22WWPKP', { anonymize_ip: true });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
