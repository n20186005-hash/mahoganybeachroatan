import { useTranslations, useMessages } from 'next-intl';

export default function AudiencePlansSection() {
  const t = useTranslations('audiencePlans');
  const messages = useMessages() as any;
  const plans = (messages?.audiencePlans?.plans || []) as Array<{
    id: string;
    name: string;
    desc: string;
    best: string;
    steps: string[];
    tips: string[];
  }>;

  return (
    <section id="plans" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.id || i}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold mb-4"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {plan.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {plan.desc}
              </p>

              <div className="text-sm mb-4">
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('bestTimeLabel')}:
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{plan.best}</span>
              </div>

              <div className="text-sm mb-4">
                <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t('stepsLabel')}
                </p>
                <ol className="space-y-2">
                  {(plan.steps || []).map((step, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-sm mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t('tipsLabel')}
                </p>
                <ul className="space-y-1.5">
                  {(plan.tips || []).map((tip, j) => (
                    <li key={j} style={{ color: 'var(--text-muted)' }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
