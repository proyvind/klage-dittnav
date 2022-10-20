import { Heading, LinkPanel } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { Link } from 'react-router-dom';
import { isoDateTimeToPretty } from '../../domain/date/date';
import { useTitle } from '../../hooks/use-titles';
import { useIsAuthenticated } from '../../hooks/use-user';
import { LawBook } from '../../icons/law-book';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useGetAvailableAnkerQuery } from '../../redux-api/case/anke/api';
import { AvailableAnke } from '../../redux-api/case/anke/types';
import { InngangPanel } from '../../routes/inngang/styled-components/panels';
import { TemaKey } from '../../tema/tema';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';

interface Props {
  temaAndTitleKeyList: [TemaKey, string | null][];
}

export const AvailableAnker = ({ temaAndTitleKeyList }: Props) => {
  const { data: isAuthenticated } = useIsAuthenticated();
  const { data, isLoading } = useGetAvailableAnkerQuery(isAuthenticated === true ? undefined : skipToken);
  const { personalised } = useTranslation();

  if (isLoading || typeof data === 'undefined') {
    return null;
  }

  const hasFilter = temaAndTitleKeyList.length !== 0;

  const anker = data
    .filter((anke) => !hasFilter || temaAndTitleKeyList.some(([tema]) => anke.tema === tema))
    .map((anke) => <Anke key={anke.id} {...anke} />);

  if (anker.length === 0) {
    return null;
  }

  return (
    <InngangPanel as="section">
      <Heading level="1" size="small">
        {personalised.available_anker.title}
      </Heading>
      {anker}
    </InngangPanel>
  );
};

const Anke = (anke: AvailableAnke) => {
  const lang = useLanguage();
  const { personalised } = useTranslation();

  const [title] = useTitle(anke.titleKey);

  return (
    <IconLinkPanel icon={<LawBook aria-hidden />} as={Link} to={`/${lang}/anke/${anke.id}/begrunnelse`} border>
      <LinkPanel.Title>{title}</LinkPanel.Title>
      <LinkPanel.Description>
        {personalised.available_anker.klage_date}: {isoDateTimeToPretty(anke.vedtakDate)}
      </LinkPanel.Description>
    </IconLinkPanel>
  );
};
