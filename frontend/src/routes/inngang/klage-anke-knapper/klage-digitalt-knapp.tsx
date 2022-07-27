import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconLinkPanel } from '../../../icon-link-panel/icon-link-panel';
import { MobilePhone } from '../../../icons/MobilePhoneIcon';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
  query: string;
}

export const KlageDigitaltKnapp = ({ query }: Props) => {
  const { inngang } = useTranslation();
  const lang = useLanguage();

  return (
    <IconLinkPanel icon={<MobilePhone />} as={NavLink} to={`/${lang}/ny${query}`} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.digital.cards.digital_klage.title}</LinkPanel.Title>
      <LinkPanel.Description>{inngang.innsendingsvalg.digital.cards.digital_klage.description}</LinkPanel.Description>
    </IconLinkPanel>
  );
};
