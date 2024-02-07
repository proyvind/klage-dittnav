import { Counter, LabelValues } from 'prom-client';
import { registers } from '@app/prometheus/types';

const viewCountLabels = ['url', 'has_saksnummer', 'redirected_from', 'referrer'] as const;

export const viewCountCounter = new Counter({
  name: 'view_count',
  help: 'Number of views.',
  labelNames: viewCountLabels,
  registers,
});

const externalRedirectLabels = ['url', 'has_saksnummer', 'redirected_from', 'referrer'] as const;
export type ExternalRedirectLabels = LabelValues<(typeof externalRedirectLabels)[number]>;

export const externalRedirectCounter = new Counter({
  name: 'external_redirect',
  help: 'Number of redirects to nav.no/klage.',
  labelNames: externalRedirectLabels,
  registers,
});

const intternalRedirectLabels = ['url', 'redirected_to', 'redirected_from', 'has_saksnummer', 'referrer'] as const;
export type InternalRedirectLabels = LabelValues<(typeof intternalRedirectLabels)[number]>;

export const internalRedirectCounter = new Counter({
  name: 'internal_redirect',
  help: 'Number of internal redirects from deprecated URLs.',
  labelNames: intternalRedirectLabels,
  registers,
});
