import { useTranslations, useMessages } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as Array<{
    name: string;
    scope: string;
    url: string;
  }>;

  return (
    <section id="sources" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('lead')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-base font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {item.name}
              </a>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.scope}
              </p>
            </div>
          ))}
        </div>

        {/* 权威官方旅游门户出站链接 */}
        {messages?.sources?.note ? (
          <div
            className="mt-10 rounded-xl p-5 text-sm leading-relaxed"
            style={{
              background: 'var(--bg-tertiary)',
              borderLeft: '4px solid var(--accent)',
              color: 'var(--text-secondary)',
            }}
          >
            <a
              href={ATTRACTION.govTourismUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {messages.sources.note}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
