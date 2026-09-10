import { useTranslations, useMessages } from 'next-intl';

export default function SeasonSection() {
  const t = useTranslations('seasonPlan');
  const messages = useMessages() as any;
  const rows = (messages?.seasonPlan?.rows || []) as Array<{
    season: string;
    weather: string;
    water: string;
    wildlife: string;
    advice: string;
  }>;

  return (
    <section id="seasonal" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)' }}
        >
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              style={{ borderCollapse: 'collapse', minWidth: '760px' }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  {[
                    'columns.season',
                    'columns.weather',
                    'columns.water',
                    'columns.wildlife',
                    'columns.advice',
                  ].map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                      style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
                    >
                      {t(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 ? 'var(--bg-tertiary)' : 'var(--card-bg)' }}>
                    <td
                      className="px-4 py-3 align-top font-medium whitespace-nowrap"
                      style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border-color)' }}
                    >
                      {row.season}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      {row.weather}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      {row.water}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      {row.wildlife}
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      {row.advice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs mt-6 leading-relaxed max-w-3xl mx-auto text-center" style={{ color: 'var(--text-muted)' }}>
          {t('basedOn')}
        </p>
      </div>
    </section>
  );
}
