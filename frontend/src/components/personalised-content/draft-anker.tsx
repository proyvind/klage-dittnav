import { Heading } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useMemo } from 'react';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { useGetAnkerQuery } from '@app/redux-api/case/anke/api';
import { InngangPanel } from '@app/routes/inngang/styled-components/panels';
import { ApiAnke } from './draft-anke';

interface Props {
  innsendingsytelser: Innsendingsytelse[];
}

export const DraftAnker = (props: Props) => {
  const { personalised } = useTranslation();

  const apiAnker = useApiAnker(props).map((anke) => <ApiAnke key={anke.id} {...anke} />);

  if (apiAnker.length === 0) {
    return null;
  }

  return (
    <InngangPanel as="section">
      <Heading level="1" size="large">
        {personalised.draft_anker.title}
      </Heading>
      {apiAnker}
    </InngangPanel>
  );
};

const useApiAnker = ({ innsendingsytelser }: Props) => {
  const { data: isAuthenticated } = useIsAuthenticated();
  const { data, isLoading } = useGetAnkerQuery(isAuthenticated === true ? undefined : skipToken);

  const hasFilter = innsendingsytelser.length !== 0;

  const filtered = useMemo(
    () => data?.filter((anke) => !hasFilter || innsendingsytelser.includes(anke.innsendingsytelse)) ?? [],
    [data, hasFilter, innsendingsytelser],
  );

  if (isLoading || typeof data === 'undefined' || data.length === 0) {
    return [];
  }

  return filtered;
};
