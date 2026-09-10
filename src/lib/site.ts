/**
 * 单景点 SEO 实体绑定配置
 *
 * 对应「单景点 SEO 实体绑定配置变量表」的取值如下：
 *
 * | 变量占位符              | 值                                                       |
 * | ----------------------- | -------------------------------------------------------- |
 * | {{DOMAIN_NAME}}         | mahoganybeachroatan.com                                  |
 * | {{ATTRACTION_FULL_NAME}}| Mahogany Bay Cruise Terminal                             |
 * | {{ATTRACTION_SHORT_NAME}}| Mahogany Bay                                            |
 * | {{CITY_NAME}}           | Coxen Hole                                               |
 * | {{STATE_PROVINCE}}      | Bay Islands                                              |
 * | {{COUNTRY_NAME}}        | Honduras                                                 |
 * | {{COUNTRY_CODE_2LETTER}}| HN                                                       |
 * | {{POSTAL_CODE}}         | 34101                                                    |
 * | {{LATITUDE}}            | 16.3272838                                               |
 * | {{LONGITUDE}}           | -86.4974444                                              |
 * | {{MAPS_SHARE_URL}}      | https://maps.app.goo.gl/h2HMcaJb5GiBKSBJA                |
 * | {{MAPS_EMBED_SRC}}      | pb 参数形式的 Google Maps embed 链接                      |
 * | {{NEARBY_LANDMARK_1}}   | West Bay Beach                                           |
 * | {{NEARBY_LANDMARK_2}}   | West End Village                                         |
 * | {{GOVT_TOURISM_URL}}    | https://honduras.travel                                  |
 */

export const DOMAIN_NAME = 'mahoganybeachroatan.com';
export const BASE_URL = `https://${DOMAIN_NAME}`;

export const ATTRACTION = {
  fullName: 'Mahogany Bay Cruise Terminal',
  shortName: 'Mahogany Bay',
  city: 'Coxen Hole',
  state: 'Bay Islands',
  country: 'Honduras',
  countryCode: 'HN',
  postalCode: '34101',
  plusCode: '8GG3+W27',
  latitude: 16.3272838,
  longitude: -86.4974444,
  mapsShareUrl: 'https://maps.app.goo.gl/h2HMcaJb5GiBKSBJA',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6810.283816576527!2d-86.49744439999999!3d16.3272838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f69e5fd199c5865%3A0xc8e9b9f9f2deb4c1!2sMahogany%20Bay%20Cruise%20Terminal!5e1!3m2!1s__LANG__!2s!4v1788847101977!5m2!1s__LANG__!2s',
  govTourismUrl: 'https://honduras.travel',
  heroImagePath: '/gallery/mahogany-bay-cruise-terminal-1.jpg',
  heroImageSrc:
    '/gallery/mahogany-bay-cruise-terminal-1.jpg',
  heroImageUrl: `${BASE_URL}/gallery/mahogany-bay-cruise-terminal-1.jpg`,
};

export const HERO_IMAGE_SRC = ATTRACTION.heroImagePath;

/** 根据界面语言返回地图 embed 的 hl 语言标记 */
export function embedLang(locale: string): string {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'es') return 'es';
  return 'en';
}

/** 返回带界面语言标记的 Google Maps embed src */
export function mapsEmbedSrcForLocale(locale: string): string {
  const lang = embedLang(locale);
  return ATTRACTION.mapsEmbedSrc.replace(/__LANG__/g, lang);
}

export type LocaleMessages = Record<string, any>;

/** alternateName（别名）随语言提供，用于扩展实体的多语言语义关联 */
function alternateNames(locale: string): string[] {
  if (locale === 'zh') {
    return [
      ATTRACTION.shortName,
      '桃花心木湾邮轮码头',
      'Mahogany Bay Roatán',
      'Mahogany Bay 邮轮码头',
    ];
  }
  if (locale === 'es') {
    return [ATTRACTION.shortName, 'Terminal de Cruceros Mahogany Bay', 'Mahogany Bay Roatán'];
  }
  return [ATTRACTION.shortName, 'Mahogany Bay Roatán', 'Mahogany Bay Cruise Port'];
}

/** TouristAttraction 结构化数据 */
export function buildAttractionSchema(locale: string, messages: LocaleMessages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name: ATTRACTION.fullName,
    alternateName: alternateNames(locale),
    description:
      messages?.meta?.description ||
      `Comprehensive visitor guide to ${ATTRACTION.fullName} in ${ATTRACTION.city}, ${ATTRACTION.state}, ${ATTRACTION.country}.`,
    url: `${BASE_URL}/`,
    image: [ATTRACTION.heroImageUrl],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ATTRACTION.fullName}, ${ATTRACTION.plusCode}`,
      addressLocality: ATTRACTION.city,
      addressRegion: ATTRACTION.state,
      postalCode: ATTRACTION.postalCode,
      addressCountry: ATTRACTION.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    hasMap: ATTRACTION.mapsShareUrl,
    sameAs: [ATTRACTION.mapsShareUrl, ATTRACTION.govTourismUrl],
  };
}

/** FAQPage 结构化数据（与页面可见 FAQ 完全一致） */
export function buildFaqSchema(messages: LocaleMessages) {
  const items: Array<{ q: string; a: string }> =
    (messages?.faq?.items as Array<{ q: string; a: string }>) || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
