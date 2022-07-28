import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IconLinkPanel } from '../../../components/icon-link-panel/icon-link-panel';
import { MobilePhoneIdCard } from '../../../icons/mobile-phone-id-card';
import { useTranslation } from '../../../language/use-translation';

export const KlageDigitaltFullmaktKnapp = () => {
  const { fullmakt } = useTranslation();

  return (
    <IconLinkPanel icon={<MobilePhoneIdCard />} as={Link} to={`${window.location.pathname}/fullmakt`} border>
      <LinkPanel.Title>{fullmakt.title}</LinkPanel.Title>
      <LinkPanel.Description>{fullmakt.description}</LinkPanel.Description>
    </IconLinkPanel>
  );
};
