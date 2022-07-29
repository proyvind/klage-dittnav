import { GuidePanel, Link, Loader } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import styled from 'styled-components';
import { useStatus } from '../../hooks/use-user';
import { useGetAvailableAnkerQuery } from '../../redux-api/case/available-anke/api';
import { TemaKey } from '../../tema/tema';
import { AnkeDigitaltKnapp } from '../inngang/klage-anke-knapper/anke-digitalt-knapp';

interface Props {
  show: boolean;
  temaKey: TemaKey;
}

export const DineAnkemuligheter = ({ show, temaKey }: Props) => {
  const { data: isLoggedIn, isLoading } = useStatus();
  const { data: allAvailableAnkerForUser = [] } = useGetAvailableAnkerQuery(isLoggedIn === true ? temaKey : skipToken);

  if (!show) {
    return null;
  }

  if (isLoading) {
    return (
      <GuidePanel>
        <Loader size="large" title="Laster bruker..." />
        Laster bruker...
      </GuidePanel>
    );
  }

  if (isLoggedIn === false) {
    return (
      <GuidePanel>
        <Link href="/oauth2/login">Logg inn</Link> for å klage/anke digitalt og se saker du kan anke på.
      </GuidePanel>
    );
  }

  if (allAvailableAnkerForUser.length === 0) {
    return <GuidePanel>Det er ingen ankemuligheter.</GuidePanel>;
  }

  return (
    <>
      {allAvailableAnkerForUser.map((anke) => (
        <Row key={anke.ankeInternalSaksnummer}>
          <AnkeDigitaltKnapp ankemulighet={anke} />
        </Row>
      ))}
    </>
  );
};

const Row = styled.div`
  margin-bottom: 32px;
`;
