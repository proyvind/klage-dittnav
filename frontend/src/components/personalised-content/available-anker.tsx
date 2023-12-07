import { Heading, LinkPanel } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { Link } from 'react-router-dom';
import { isoDateTimeToPretty } from '@app/domain/date/date';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { LawBook } from '@app/icons/law-book';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useGetAvailableAnkerQuery } from '@app/redux-api/case/anke/api';
import { AvailableAnke } from '@app/redux-api/case/anke/types';
import { InngangPanel } from '@app/routes/inngang/styled-components/panels';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';

interface Props {
  innsendingsytelser: Innsendingsytelse[];
}

export const AvailableAnker = ({ innsendingsytelser }: Props) => {
  const { data: isAuthenticated } = useIsAuthenticated();
  const { data, isLoading } = useGetAvailableAnkerQuery(isAuthenticated === true ? undefined : skipToken);
  const { personalised } = useTranslation();

  if (isLoading || typeof data === 'undefined') {
    return null;
  }

  const hasFilter = innsendingsytelser.length !== 0;

  const anker = data
    .filter(
      (anke) =>
        !hasFilter || innsendingsytelser.some((innsendingsytelse) => anke.innsendingsytelse === innsendingsytelse),
    )
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

  const [title] = useInnsendingsytelseName(anke.innsendingsytelse);

  return (
    <IconLinkPanel icon={<LawBook aria-hidden />} as={Link} to={`/${lang}/anke/${anke.id}/begrunnelse`} border>
      <LinkPanel.Title>{title}</LinkPanel.Title>
      <LinkPanel.Description>
        {personalised.available_anker.klage_date}: {isoDateTimeToPretty(anke.vedtakDate)}
      </LinkPanel.Description>
    </IconLinkPanel>
  );
};
