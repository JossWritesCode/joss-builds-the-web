import { useEffect } from "react";
export function useAnalytics(page: string) {
  useEffect(() => {
    // TODO: Send page view to analytics provider
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ page }) })
  }, [page]);
}
