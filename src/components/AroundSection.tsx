import { useTranslations, useMessages } from 'next-intl';

export default function AroundSection() {
  const t = useTranslations('around');
  const tMap = useTranslations('mapSection');
  const messages = useMessages() as any;
  const items = (messages?.around?.items || []) as Array<{
    name: string;
    desc: string;
    mapQuery?: string;
  }>;

  return (
    <section id="attractions" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('lead')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const query = encodeURIComponent(
              item.mapQuery || `${item.name}, Roatan, Honduras`
            );
            const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
            return (
              <div
                key={i}
                className="rounded-xl p-6 flex flex-col"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm mt-4 hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {tMap('openMaps')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
