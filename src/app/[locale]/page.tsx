import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import HeritageStories from '@/components/HeritageStories';
import WeatherSection from '@/components/WeatherSection';
import TideSection from '@/components/TideSection';
import SeasonSection from '@/components/SeasonSection';
import AudiencePlansSection from '@/components/AudiencePlansSection';
import ItinerarySection from '@/components/ItinerarySection';
import FacilitiesSection from '@/components/FacilitiesSection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import AroundSection from '@/components/AroundSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import {
  BASE_URL,
  ATTRACTION,
  buildAttractionSchema,
  buildFaqSchema,
} from '@/lib/site';

const localeMap: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  es: 'es_HN',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${BASE_URL}/zh`;
  const enUrl = `${BASE_URL}/en`;
  const esUrl = `${BASE_URL}/es`;

  let selfUrl = esUrl;
  if (locale === 'zh') selfUrl = zhUrl;
  else if (locale === 'en') selfUrl = enUrl;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        es: esUrl,
        zh: zhUrl,
        en: enUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: ATTRACTION.fullName,
      locale: localeMap[locale] || 'es_HN',
      type: 'website',
      images: [
        {
          url: ATTRACTION.heroImageUrl,
          alt: messages?.seo?.heroAlt || ATTRACTION.fullName,
        },
      ],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const attractionSchema = buildAttractionSchema(locale, messages);
  const faqSchema = buildFaqSchema(messages);

  return (
    <>
      {/* TouristAttraction 结构化数据 (Schema.org / JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />
      {/* FAQPage 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HistoryTimeline />
        <HeritageStories />
        <WeatherSection />
        <TideSection />
        <SeasonSection />
        <AudiencePlansSection />
        <ItinerarySection />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <AroundSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
