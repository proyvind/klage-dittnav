import { register } from 'prom-client';
import { NAIS_NAMESPACE } from '@app/config/env';
import { VERSION } from '@app/config/version';

register.setDefaultLabels({
  app_version: VERSION.substring(0, 7),
  namespace: NAIS_NAMESPACE,
});

export const registers = [register];
