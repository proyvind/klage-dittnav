import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconLinkPanel } from '../../../icon-link-panel/icon-link-panel';
import { MobilePhoneIdCard } from '../../../icons/MobilePhoneIdCardIcon';
import { useTranslation } from '../../../language/use-translation';

export const KlageDigitaltFullmaktKnapp = () => {
  const { inngang } = useTranslation();

  return (
    <IconLinkPanel icon={<MobilePhoneIdCard />} as={NavLink} to={`${window.location.pathname}/fullmakt`} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.digital.cards.fullmakt.title}</LinkPanel.Title>
      <LinkPanel.Description>{inngang.innsendingsvalg.digital.cards.fullmakt.description}</LinkPanel.Description>
    </IconLinkPanel>
  );
};
