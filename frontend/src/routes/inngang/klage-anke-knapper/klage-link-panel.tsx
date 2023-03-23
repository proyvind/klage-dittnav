import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IconLinkPanel } from '@app/components/icon-link-panel/icon-link-panel';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { LetterOpened } from '@app/icons/letter-opened';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  query: string;
  supportsDigitalKlage: boolean;
}

export const KlageLinkPanel = ({ innsendingsytelse, query, supportsDigitalKlage }: Props) => {
  const lang = useLanguage();
  const { inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  return (
    <IconLinkPanel icon={<LetterOpened />} as={Link} to={`/${lang}/klage/ny/${innsendingsytelse}${query}`} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.klage.title}</LinkPanel.Title>
      <Description isAuthenticated={isAuthenticated} supportsDigitalKlage={supportsDigitalKlage} />
    </IconLinkPanel>
  );
};

interface DescriptionProps {
  isAuthenticated?: boolean;
  supportsDigitalKlage: boolean;
}

const Description = ({ isAuthenticated, supportsDigitalKlage }: DescriptionProps) => {
  const { inngang } = useTranslation();

  if (isAuthenticated === true) {
    if (supportsDigitalKlage === true) {
      return (
        <LinkPanel.Description>{inngang.innsendingsvalg.klage.description.logged_in_digital}</LinkPanel.Description>
      );
    }

    if (supportsDigitalKlage === false) {
      return <LinkPanel.Description>{inngang.innsendingsvalg.klage.description.logged_in_post}</LinkPanel.Description>;
    }
  } else {
    if (supportsDigitalKlage === false) {
      return <LinkPanel.Description>{inngang.innsendingsvalg.klage.description.logged_out_post}</LinkPanel.Description>;
    }

    if (supportsDigitalKlage === true) {
      return (
        <LinkPanel.Description>{inngang.innsendingsvalg.klage.description.logged_out_digital}</LinkPanel.Description>
      );
    }
  }

  return null;
};
