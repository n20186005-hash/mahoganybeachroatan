import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es', 'zh'],
  // English is the primary audience (≈88% of organic clicks come from the US/Canada),
  // so the default entry point is now `/en`. The Spanish `/es` page keeps its existing
  // rankings — it is NOT redirected or removed, only the root fallback changes.
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/roatan-cruise-ports': '/roatan-cruise-ports',
    '/isla-tropicale-roatan': '/isla-tropicale-roatan',
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
