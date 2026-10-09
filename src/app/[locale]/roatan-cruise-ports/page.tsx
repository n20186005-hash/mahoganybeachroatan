import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { buildTopicMetadata } from '@/lib/topic-seo';

const SLUG = 'roatan-cruise-ports';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const topic = messages?.topicPages?.[SLUG];
  return buildTopicMetadata(locale, SLUG, topic);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TopicPage locale={locale} slug={SLUG} />;
}
