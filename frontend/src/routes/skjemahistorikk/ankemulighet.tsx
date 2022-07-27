import { Link } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { dateDisplayWithFallbackText } from '../../date/date';
import { useTemaName } from '../../hooks/use-titles';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { AnkemulighetStatus, AvailableAnke, AvailableAnkeStatus } from '../../redux-api/case/available-anke/types';
import { MarginTopContainer } from '../../styled-components/common';

interface Props {
  ankemulighet: AvailableAnke;
}

export const Ankemulighet = ({ ankemulighet }: Props) => {
  const { ankeskjema } = useTranslation();
  const lang = useLanguage();

  const klage = `Klage (${dateDisplayWithFallbackText(
    ankemulighet.innsendtDate,
    ankeskjema.summary.sections.case.no_date
  )})`;

  const datoVedtak = `Dato vedtak: 
  ${dateDisplayWithFallbackText(ankemulighet.vedtakDate, ankeskjema.summary.sections.case.no_date)}`;

  return (
    <ListItem>
      <article>
        <Title>{klage}</Title>
        <Content>
          <Info>Tema: {useTemaName(ankemulighet.tema)}</Info>
          <Info>{datoVedtak}</Info>
          <Info>Utfall: {ankemulighet.utfall}</Info>
          <MarginTopContainer>
            <Link to={`/${lang}/anke/ny?saksnummer=${ankemulighet.ankeInternalSaksnummer}`} as={NavLink}>
              {getText(ankemulighet.ankeStatus)}
            </Link>
          </MarginTopContainer>
        </Content>
      </article>
    </ListItem>
  );
};

const getText = (status: AvailableAnkeStatus) => {
  if (status === AnkemulighetStatus.OPEN) {
    return 'Klikk her for å anke';
  }

  return 'Fortsett påbegynt anke';
};

const Title = styled.h1`
  font-size: 1em;
`;

const Content = styled.div`
  padding-left: 1em;
`;

const Info = styled.div`
  display: list-item;
  list-style: disc;
  margin-left: 1em;
`;

const ListItem = styled.li`
  padding: 0;
  margin: 0;
  margin-top: 40px;
`;
