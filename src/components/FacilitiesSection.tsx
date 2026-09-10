import { useTranslations, useMessages } from 'next-intl';

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    name: string;
    desc: string;
    tip: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
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
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                  style={{ background: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              {item.tip ? (
                <p
                  className="text-xs leading-relaxed mt-3 pl-3"
                  style={{ color: 'var(--text-muted)', borderLeft: '2px solid var(--accent)' }}
                >
                  {item.tip}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="text-xs text-center mt-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
