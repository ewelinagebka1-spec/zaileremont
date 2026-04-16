'use client';

import { useEffect } from 'react';

interface PurchaseTrackerProps {
  value?: number;
  currency?: string;
  eventId?: string;
}

/**
 * Fires Meta Pixel Purchase event on mount.
 * Used on /dziekujemy (thank-you page after Stripe redirect).
 */
export default function PurchaseTracker({
  value = 29.99,
  currency = 'PLN',
  eventId,
}: PurchaseTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fbq = (window as any).fbq;
    if (typeof fbq !== 'function') return;

    // Deduplicate repeated mounts per session
    const sessionKey = `purchase_fired_${eventId || 'default'}`;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // sessionStorage not available — fire anyway
    }

    fbq('track', 'Purchase', {
      value,
      currency,
      content_name: 'Raport cenowy remontu',
      content_type: 'product',
    });
  }, [value, currency, eventId]);

  return null;
}
