'use client';

import { useSyncExternalStore } from 'react';

import { type TrackingField, trackingFields } from '@/lib/leads/fields';

/**
 * Attribution for every lead (brief §5): UTM parameters, the ad ID and the
 * landing URL, saved first-touch in sessionStorage so they survive a scroll,
 * an anchor jump or a reload, then written into hidden inputs. Without
 * JavaScript the inputs are simply absent and the form still submits.
 *
 * Ad ID: Meta and Google ad URLs should carry `ad_id={{ad.id}}` (see
 * HANDOVER.md); `utm_id` is accepted as a fallback.
 */
const KEY = 'pg_attribution';
let cached: string | null = null;

function read(): string {
  if (cached !== null) return cached;

  try {
    const stored = sessionStorage.getItem(KEY);

    if (stored) return (cached = stored);

    const params = new URLSearchParams(location.search);

    const value: Partial<Record<TrackingField, string>> = {
      page_url: location.href,
    };

    for (const f of trackingFields) {
      const v = params.get(f);

      if (v) value[f] = v;
    }

    if (!value.ad_id && params.get('utm_id'))
      value.ad_id = params.get('utm_id')!;

    cached = JSON.stringify(value);
    sessionStorage.setItem(KEY, cached);
  } catch {
    cached = JSON.stringify({ page_url: location.href });
  }

  return cached;
}

/** Attribution never changes after load, so there is nothing to subscribe to. */
const noop = () => undefined;
const subscribe = () => noop;

export function UtmFields() {
  const json = useSyncExternalStore(subscribe, read, () => '{}');
  const values = JSON.parse(json) as Partial<Record<TrackingField, string>>;

  return (
    <>
      {trackingFields.map((f) =>
        values[f] ? (
          <input key={f} type="hidden" name={f} value={values[f]} />
        ) : null
      )}
    </>
  );
}
