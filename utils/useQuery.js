// original by https://github.com/vercel/next.js/discussions/12661#discussioncomment-97163
// i need this, as i can't use a query param in the useEffect hook otherwise
import { useRouter } from 'next/router';

// Resolves query or returns null
export default function useQuery() {
  const router = useRouter();
  const hasQueryParameters = /\[.+]/.test(router.route) || /\?./.test(router.asPath);
  const ready = !hasQueryParameters || Object.keys(router.query).length > 0;
  if (!ready) return;
  return router.query;
}
