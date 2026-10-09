import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,
  // Default entry point is now English (`/en`); `/es` and `/zh` remain fully accessible.
  // We keep locale detection off so the root always falls back to the default locale.
  localeDetection: false,
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
