import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  topicCanonical,
  buildTopicBreadcrumbSchema,
  buildTopicFaqSchema,
} from '@/lib/topic-seo';
import type { LocaleMessages } from '@/lib/site';

export default async function TopicPage({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  setRequestLocale(locale);
  const messages = (await getMessages()) as LocaleMessages;
  const topic = (messages as any)?.topicPages?.[slug] as
    | (LocaleMessages & {
        h1: string;
        intro: string;
        sections?: Array<{ heading: string; body: string }>;
        faq?: Array<{ q: string; a: string }>;
        relatedTitle?: string;
        related?: Array<{ slug: string; title: string; desc: string }>;
      })
    | undefined;

  if (!topic || !topic.h1) {
    notFound();
  }

  const breadcrumb = buildTopicBreadcrumbSchema(locale, slug, topic.h1);
  const faqSchema = buildTopicFaqSchema(topic as LocaleMessages);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {topic.faq && topic.faq.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }} aria-label="Breadcrumb">
            <a href={`/${locale}`} style={{ color: 'var(--accent)' }}>
              Home
            </a>
            <span className="mx-2">/</span>
            <span>{topic.h1}</span>
          </nav>

          <h1
            className="font-display text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {topic.h1}
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {topic.intro}
          </p>

          {/* Sections */}
          {topic.sections?.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                className="font-display text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.heading}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {section.body}
              </p>
            </section>
          ))}

          {/* FAQ */}
          {topic.faq && topic.faq.length > 0 ? (
            <section className="mb-10">
              <h2
                className="font-display text-2xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {topic.faq.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{
                      background: 'var(--card-bg)',
                      boxShadow: 'var(--card-shadow)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.q}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Related guides (internal links) */}
          {topic.related && topic.related.length > 0 ? (
            <section className="mb-6">
              <h2
                className="font-display text-xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {topic.relatedTitle || 'Related guides'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {topic.related.map((link, i) => (
                  <a
                    key={i}
                    href={`/${locale}/${link.slug}`}
                    className="block rounded-xl p-5 transition-shadow hover:shadow-md"
                    style={{
                      background: 'var(--card-bg)',
                      boxShadow: 'var(--card-shadow)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      className="font-semibold mb-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {link.title}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
