import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { dateDisplayWithFallbackText } from '../../../date/date';
import { IconLinkPanel } from '../../../icon-link-panel/icon-link-panel';
import { MobilePhoneWithLawBook } from '../../../icons/MobilePhoneWithLawBook';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { AvailableAnke } from '../../../redux-api/case/available-anke/types';
import { CaseStatus } from '../../../redux-api/case/types';

interface Props {
  ankemulighet: AvailableAnke;
}

export const AnkeDigitaltKnapp = ({ ankemulighet }: Props) => {
  const { inngang, utfall } = useTranslation();
  const lang = useLanguage();
  const utfallTekst = utfall[ankemulighet.utfall];

  const getTitle = () => {
    if (ankemulighet.ankeStatus === CaseStatus.DRAFT) {
      return inngang.innsendingsvalg.digital.cards.digital_anke.title_resume;
    }

    return inngang.innsendingsvalg.digital.cards.digital_anke.title;
  };

  return (
    <IconLinkPanel
      icon={<MobilePhoneWithLawBook />}
      as={NavLink}
      to={`/${lang}/anke/ny?saksnummer=${ankemulighet.ankeInternalSaksnummer}`}
      border
    >
      <LinkPanel.Title>{getTitle()}</LinkPanel.Title>
      <LinkPanel.Description>
        {inngang.innsendingsvalg.digital.cards.digital_anke.description(
          dateDisplayWithFallbackText(ankemulighet.vedtakDate, '(fant ikke vedtaksdato)'),
          utfallTekst
        )}
      </LinkPanel.Description>
    </IconLinkPanel>
  );
};
