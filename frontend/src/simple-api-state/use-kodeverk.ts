import { SimpleApiState, useSimpleApiState } from './simple-api-state';
import { IKodeverkSimpleValue } from './types/kodeverk';

const klageenheter = new SimpleApiState<IKodeverkSimpleValue[]>(
  `/api/klage-kodeverk-api/kodeverk/klageenheterforankeinnsending`,
);

export const useKlageenheter = () => useSimpleApiState(klageenheter);
