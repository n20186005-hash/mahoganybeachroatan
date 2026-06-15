'use client';

import { useTranslations } from 'next-intl';

export default function BasicInfo() {
  const t = useTranslations('basicInfo');
  const tHero = useTranslations('hero');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title={t('officialName')} value={t('officialNameValue')} />
          {t.raw('alias') && <InfoCard title={t('alias')} value={t('aliasValue')} />}
          <InfoCard title={t('type')} value={t('typeValue')} />
          <InfoCard title={t('country')} value={t('countryValue')} />
          <InfoCard title={t('city')} value={t('cityValue')} />
          <InfoCard title={t('plusCode')} value={t('plusCodeValue')} />
          <InfoCard title={t('googleRating')} value={`${tHero('rating')}/5 (${tHero('reviewCount')})`} />
          <div className="md:col-span-2 lg:col-span-2">
            <InfoCard title={t('address')} value={t('addressValue')} />
          </div>
        </div>

        {t.raw('addressTip') && (
          <div className="mt-6 p-4 sm:p-5 rounded-xl text-sm leading-relaxed" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}>
            <span className="font-semibold mr-1.5" style={{ color: 'var(--accent)' }}>
              {t('tipLabel')}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {t('addressTip').replace('***提示：*', '').replace('***Note:*', '').replace('***Nota:*', '')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{title}</p>
      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
    </div>
  );
}
