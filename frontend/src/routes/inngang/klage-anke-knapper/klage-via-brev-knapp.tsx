import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { IconLinkPanel } from '../../../icon-link-panel/icon-link-panel';
import { LetterOpened } from '../../../icons/LetterOpenedIcon';
import { StringValue, klageFormUrl } from '../../../kategorier/kategorier';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
  mailKlageUrl?: StringValue;
}

export const KlageViaBrevKnapp = ({ mailKlageUrl }: Props) => {
  const lang = useLanguage();
  const { inngang } = useTranslation();

  return (
    <IconLinkPanel icon={<LetterOpened />} href={(mailKlageUrl ?? klageFormUrl)[lang]} border>
      <LinkPanel.Title>{inngang.innsendingsvalg.digital.cards.post.title}</LinkPanel.Title>
      <LinkPanel.Description>{inngang.innsendingsvalg.digital.cards.post.description}</LinkPanel.Description>
    </IconLinkPanel>
  );
};
