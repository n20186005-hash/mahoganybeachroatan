import { useTranslations, useMessages } from 'next-intl';

export default function HeritageStories() {
  const t = useTranslations('heritage');
  const messages = useMessages() as any;
  const cards = (messages?.heritage?.cards || []) as Array<{ heading: string; text: string }>;

  return (
    <section id="heritage" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="hidden sm:flex w-11 h-11 rounded-xl items-center justify-center font-display font-bold text-white flex-shrink-0"
                  style={{ background: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {card.heading}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {messages?.heritage?.note ? (
          <p className="text-xs text-center mt-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {messages.heritage.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
