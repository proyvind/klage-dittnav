import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { KlageLinkPanel } from '../../../link/link';
import { LenkePanelContentWithImage, IconContainer, MarginTopContainer } from '../../../styled-components/common';
import { useTranslation } from '../../../language/use-translation';
import { useLanguage } from '../../../language/use-language';
import { AnkeStatus, AvailableAnke } from '../../../store/anke/types/anke';
import MobilePhoneWithLawBook from '../../../icons/MobilePhoneWithLawBook';
import { dateDisplayWithFallbackText } from '../../../date/date';

interface Props {
    ankemulighet: AvailableAnke;
}

export const AnkeDigitaltKnapp = ({ ankemulighet }: Props) => {
    const { inngang, utfall } = useTranslation();
    const lang = useLanguage();
    const utfallTekst = utfall[ankemulighet.utfall];

    return (
        <KlageLinkPanel href={`/${lang}/anke/ny?saksnummer=${ankemulighet.ankeInternalSaksnummer}`} border>
            <LenkePanelContentWithImage>
                <IconContainer>
                    <MobilePhoneWithLawBook />
                </IconContainer>
                <div>
                    <Systemtittel className="lenkepanel__heading">{getTitle()}</Systemtittel>
                    <MarginTopContainer>
                        <Normaltekst>
                            {inngang.innsendingsvalg.digital.cards.digital_anke.description(
                                dateDisplayWithFallbackText(ankemulighet.vedtakDate, '(fant ikke vedtaksdato)'),
                                utfallTekst
                            )}
                        </Normaltekst>
                    </MarginTopContainer>
                </div>
            </LenkePanelContentWithImage>
        </KlageLinkPanel>
    );

    function getTitle() {
        if (ankemulighet.ankeStatus === AnkeStatus.DRAFT) {
            return inngang.innsendingsvalg.digital.cards.digital_anke.title_resume;
        }
        return inngang.innsendingsvalg.digital.cards.digital_anke.title;
    }
};
