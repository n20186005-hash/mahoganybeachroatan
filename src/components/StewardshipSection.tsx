import { useTranslations, useMessages } from 'next-intl';

export default function StewardshipSection() {
  const t = useTranslations('stewardship');
  const messages = useMessages() as any;
  const science = (messages?.stewardship?.scienceItems || []) as Array<{ name: string; text: string }>;
  const duties = (messages?.stewardship?.dutyItems || []) as Array<{ name: string; text: string }>;

  return (
    <section id="stewardship" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 生态科普 */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              {t('scienceTitle')}
            </h3>
            <div className="space-y-4">
              {science.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--accent)' }}>
                    {item.name}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 访客责任 */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              {t('dutyTitle')}
            </h3>
            <div className="space-y-4">
              {duties.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 flex items-start gap-3"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
