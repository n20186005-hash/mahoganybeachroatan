import { useTranslations, useMessages } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

export default function Reviews() {
  const t = useTranslations('reviews');
  const tHero = useTranslations('hero');
  const messages = useMessages() as any;
  const rating = tHero('rating');
  const reviewCount = tHero('reviewCount');
  const ratingNote = messages?.reviews?.ratingNote || '';
  const snapshotLabel = messages?.reviews?.snapshotLabel || '';

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Rating snapshot — sourced from Google Maps, no fabricated individual reviews */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center gap-6"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-20 h-20 rounded-2xl text-4xl font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {rating}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f0b429" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {reviewCount}
                <span className="text-sm font-normal ml-1" style={{ color: 'var(--text-muted)' }}>
                  {snapshotLabel}
                </span>
              </div>
              {ratingNote ? (
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {ratingNote}
                </div>
              ) : null}
            </div>
          </div>

          <div className="sm:ml-auto">
            <a
              href={ATTRACTION.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
              }}
            >
              <span>{t('moreReviews')}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed max-w-2xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('declaration')}
        </p>
      </div>
    </section>
  );
}
