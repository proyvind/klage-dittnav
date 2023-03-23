import { Heading } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { useGetKlagerQuery } from '@app/redux-api/case/klage/api';
import { Klage } from '@app/redux-api/case/klage/types';
import { InngangPanel } from '@app/routes/inngang/styled-components/panels';
import { ApiKlage } from './draft-klage';

interface Props {
  innsendingsytelser: Innsendingsytelse[];
}

export const DraftKlager = (props: Props) => {
  const { personalised } = useTranslation();

  const apiKlager = useApiKlager(props).map((klage) => <ApiKlage key={klage.id} {...klage} />);

  if (apiKlager.length === 0) {
    return null;
  }

  return (
    <InngangPanel as="section">
      <Heading level="1" size="large">
        {personalised.draft_klager.title}
      </Heading>
      {apiKlager}
    </InngangPanel>
  );
};

const useApiKlager = ({ innsendingsytelser }: Props): Klage[] => {
  const { data: isAuthenticated } = useIsAuthenticated();
  const { data, isLoading } = useGetKlagerQuery(isAuthenticated === true ? undefined : skipToken);

  const hasFilter = innsendingsytelser.length !== 0;

  const filtered = useMemo(() => {
    if (!hasFilter) {
      return data ?? [];
    }

    return data?.filter((klage) => !hasFilter || innsendingsytelser.includes(klage.innsendingsytelse)) ?? [];
  }, [hasFilter, data, innsendingsytelser]);

  if (isAuthenticated !== true || isLoading || typeof data === 'undefined') {
    return [];
  }

  return filtered;
};
