import { LinkPanel } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconLinkPanel } from '@app/components/icon-link-panel/icon-link-panel';
import { queryStringify } from '@app/functions/query-string';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { LawBook } from '@app/icons/law-book';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  digital: boolean;
}

export const AnkeLinkPanel = ({ innsendingsytelse, digital = false }: Props) => {
  const { saksnummer } = useParams();
  const lang = useLanguage();
  const { inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const query = useMemo(() => queryStringify({ saksnummer }), [saksnummer]);

  return (
    <IconLinkPanel icon={<LawBook />} as={Link} to={`/${lang}/anke/ny/${innsendingsytelse}${query}`} border>
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
