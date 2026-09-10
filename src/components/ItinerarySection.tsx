import { useTranslations, useMessages } from 'next-intl';

export default function ItinerarySection() {
  const t = useTranslations('itinerary');
  const messages = useMessages() as any;
  const options = (messages?.itinerary?.options || []) as Array<{
    id: string;
    name: string;
    duration: string;
    pace: string;
    stops: Array<{ title: string; detail: string }>;
  }>;

  return (
    <section id="itinerary" className="section-padding">
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
          {options.map((opt, i) => (
            <div
              key={opt.id || i}
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-1 flex-wrap">
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {opt.name}
                </h3>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent)' }}
                >
                  {opt.duration}
                </span>
              </div>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                {opt.pace}
              </p>

              <ol className="space-y-0">
                {(opt.stops || []).map((stop, j) => (
                  <li key={j} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                        style={{ background: 'var(--accent)' }}
                      >
                        {j + 1}
                      </span>
                      {j < (opt.stops || []).length - 1 ? (
                        <span className="w-px flex-1 my-1" style={{ background: 'var(--border-color)' }} />
                      ) : null}
                    </div>
                    <div className="pb-5">
                      <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {stop.title}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {stop.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="text-xs text-center mt-8" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
