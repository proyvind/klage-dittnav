import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IconLinkPanel } from '../../../components/icon-link-panel/icon-link-panel';
import { queryStringify } from '../../../functions/query-string';
import { useIsAuthenticated } from '../../../hooks/use-user';
import { LawBook } from '../../../icons/law-book';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { TemaKey } from '../../../tema/tema';

interface Props {
  saksnummer: string | null;
  temaKey: TemaKey;
  titleKey: string | null;
  digital: boolean;
}

export const AnkeLinkPanel = ({ saksnummer, temaKey, titleKey, digital = false }: Props) => {
  const lang = useLanguage();
  const { inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const query = queryStringify({ saksnummer, tema: temaKey, tittel: titleKey });

  return (
    <IconLinkPanel icon={<LawBook />} as={Link} to={`/${lang}/anke/ny${query}`} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.anke.title}</LinkPanel.Title>
      <Description isAuthenticated={isAuthenticated} supportsDigitalAnke={digital} />
    </IconLinkPanel>
  );
};

interface DescriptionProps {
  isAuthenticated?: boolean;
  supportsDigitalAnke: boolean;
}

const Description = ({ isAuthenticated, supportsDigitalAnke }: DescriptionProps) => {
  const { inngang } = useTranslation();

  if (isAuthenticated === true) {
    if (supportsDigitalAnke === true) {
      return (
        <LinkPanel.Description>{inngang.innsendingsvalg.anke.description.logged_in_digital}</LinkPanel.Description>
      );
    }

    if (supportsDigitalAnke === false) {
      return <LinkPanel.Description>{inngang.innsendingsvalg.anke.description.logged_in_post}</LinkPanel.Description>;
    }
  } else {
    if (supportsDigitalAnke === false) {
      return <LinkPanel.Description>{inngang.innsendingsvalg.anke.description.logged_out_post}</LinkPanel.Description>;
    }

    if (supportsDigitalAnke === true) {
      return (
        <LinkPanel.Description>{inngang.innsendingsvalg.anke.description.logged_out_digital}</LinkPanel.Description>
      );
    }
  }

  return null;
};
