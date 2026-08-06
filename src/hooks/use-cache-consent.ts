'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'patitas_cache_consent';

export function useCacheConsent() {
  const [hasAcceptedCache, setHasAcceptedCache] = useState<boolean | null>(null);

  useEffect(() => {
    // Evitar SSR issues
    const consent = localStorage.getItem(CONSENT_KEY);
    setHasAcceptedCache(consent === 'true');
  }, []);

  const acceptCacheConsent = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setHasAcceptedCache(true);
  };

  return {
    hasAcceptedCache,
    acceptCacheConsent
  };
}
