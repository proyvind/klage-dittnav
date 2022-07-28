import { Heading } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useIsAuthenticated } from '../../hooks/use-user';
import { useTranslation } from '../../language/use-translation';
import { useGetAnkerQuery } from '../../redux-api/case/anke/api';
import { InngangPanel } from '../../routes/inngang/styled-components/panels';
import { TemaKey } from '../../tema/tema';
import { ApiAnke } from './draft-anke';

interface Props {
  temaAndTitleKeyList: [TemaKey, string | null][];
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

const useApiAnker = ({ temaAndTitleKeyList }: Props) => {
  const { data: isAuthenticated } = useIsAuthenticated();
  const { data, isLoading } = useGetAnkerQuery(isAuthenticated === true ? undefined : skipToken);

  const hasFilter = temaAndTitleKeyList.length !== 0;

  const filtered = useMemo(
    () =>
      data?.filter(
        (anke) =>
          !hasFilter || temaAndTitleKeyList.some(([tema, title]) => anke.tema === tema && anke.titleKey === title)
      ) ?? [],
    [data, hasFilter, temaAndTitleKeyList]
  );

  if (isLoading || typeof data === 'undefined' || data.length === 0) {
    return [];
  }

  return filtered;
};
