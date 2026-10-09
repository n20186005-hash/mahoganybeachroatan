import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
// For dynamic deployments, the Worker intercepts requests to `/`
// and redirects to the default locale (`/en`).
export default function RootPage() {
  redirect('/en');
}