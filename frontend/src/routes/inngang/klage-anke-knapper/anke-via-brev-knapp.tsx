import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { IconLinkPanel } from '../../../icon-link-panel/icon-link-panel';
import { LawBook } from '../../../icons/LawBook';
import { StringValue, klageFormUrl } from '../../../kategorier/kategorier';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
  mailAnkeUrl?: StringValue;
}

export const AnkeViaBrevKnapp = ({ mailAnkeUrl }: Props) => {
  const lang = useLanguage();
  const { inngang } = useTranslation();

  return (
    <IconLinkPanel icon={<LawBook />} href={(mailAnkeUrl ?? klageFormUrl)[lang]} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.digital.cards.anke.title}</LinkPanel.Title>
      <LinkPanel.Description>{inngang.innsendingsvalg.digital.cards.anke.description}</LinkPanel.Description>
    </IconLinkPanel>
  );
};
