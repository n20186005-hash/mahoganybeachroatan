import type { Metadata } from 'next';
import { BASE_URL } from './site';
import type { LocaleMessages } from './site';

export function topicCanonical(locale: string, slug: string): string {
  return `${BASE_URL}/${locale}/${slug}`;
}

/** hreflang alternates for a topic page; English is the primary audience (x-default → /en). */
export function topicLanguageAlternates(slug: string): Record<string, string> {
  const en = `${BASE_URL}/en/${slug}`;
  const es = `${BASE_URL}/es/${slug}`;
  const zh = `${BASE_URL}/zh/${slug}`;
  return { en, es, zh, 'x-default': en };
}

export function buildTopicBreadcrumbSchema(locale: string, slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: topicCanonical(locale, slug),
      },
    ],
  };
}

export function buildTopicFaqSchema(topic: LocaleMessages): ReturnType<typeof JSON.parse> {
  const items: Array<{ q: string; a: string }> = (topic as any)?.faq || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function buildTopicMetadata(
  locale: string,
  slug: string,
  topic: LocaleMessages
): Metadata {
  const selfUrl = topicCanonical(locale, slug);
  return {
    title: (topic as any)?.metaTitle || 'Mahogany Bay Cruise Port',
    description: (topic as any)?.metaDescription || '',
    alternates: {
      canonical: selfUrl,
      languages: topicLanguageAlternates(slug),
    },
    openGraph: {
      title: (topic as any)?.metaTitle || 'Mahogany Bay Cruise Port',
      description: (topic as any)?.metaDescription || '',
      url: selfUrl,
      siteName: 'Mahogany Bay Cruise Port',
      locale,
      type: 'article',
    },
  };
}
