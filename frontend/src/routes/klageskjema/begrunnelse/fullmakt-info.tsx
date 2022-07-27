import { Alert, BodyShort, Heading, Panel } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import styled from 'styled-components';
import { displayFnr, getFullName } from '../../../functions/display';
import { useTranslation } from '../../../language/use-translation';
import { useGetKlageQuery } from '../../../redux-api/case/klage/api';
import { GetFullmaktsgiverParams, useGetFullmaktsgiverQuery } from '../../../redux-api/user/api';

const PaddedPanel = styled(Panel)`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  p:first-of-type {
    margin-bottom: 10px;
  }
`;

interface Props {
  klageId: string;
}

export const FullmaktInfo = ({ klageId }: Props) => {
  const { klageskjema } = useTranslation();
  const { data: klage, isLoading: klageIsLoading } = useGetKlageQuery(klageId);

  const klageHasFullmakt = !klageIsLoading && typeof klage !== 'undefined' && klage.fullmaktsgiver !== null;

  const query: GetFullmaktsgiverParams | typeof skipToken = klageHasFullmakt
    ? { temaKey: klage.tema, fullmaktsgiver: klage.fullmaktsgiver }
    : skipToken;

  const { data: fullmaktsgiver, isLoading: fullmaktsgiverIsLoading } = useGetFullmaktsgiverQuery(query);

  if (klageHasFullmakt && !fullmaktsgiverIsLoading && typeof fullmaktsgiver !== 'undefined') {
    return (
      <PaddedPanel border>
        <Alert variant="info" inline>
          <Heading spacing size="small" level="3">
            {klageskjema.begrunnelse.fullmakt.label}
          </Heading>
          <BodyShort>{`${getFullName(fullmaktsgiver)} (${displayFnr(klage.fullmaktsgiver)})`}</BodyShort>
        </Alert>
      </PaddedPanel>
    );
  }

  return null;
};
