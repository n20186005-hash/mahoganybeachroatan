'use client';

import { useLocale, useMessages } from 'next-intl';

export default function TopicLinks() {
  const locale = useLocale();
  const messages = useMessages() as any;
  const pages = messages?.topicPages;
  if (!pages) return null;

  const slugs = ['roatan-cruise-ports', 'isla-tropicale-roatan'];
  const items = slugs
    .map((slug) => ({
      slug,
      title: pages[slug]?.h1,
      desc: pages[slug]?.metaDescription,
    }))
    .filter((i) => i.title);

  if (items.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          More Roatán Cruise Guides
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/${locale}/${item.slug}`}
              className="block rounded-2xl p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="font-display text-xl font-semibold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {item.title}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
