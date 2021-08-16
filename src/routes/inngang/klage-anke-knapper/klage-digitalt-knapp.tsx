import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { KlageLinkPanel } from '../../../link/link';
import { LenkePanelContentWithImage, IconContainer, MarginTopContainer } from '../../../styled-components/common';
import MobilePhone from '../../../icons/MobilePhoneIcon';
import { useTranslation } from '../../../language/use-translation';
import { useLanguage } from '../../../language/use-language';

interface Props {
    query: string;
}

export const KlageDigitaltKnapp = ({ query }: Props) => {
    const { inngang } = useTranslation();
    const lang = useLanguage();

    return (
        <KlageLinkPanel href={`/${lang}/ny?${query}`} border>
            <LenkePanelContentWithImage>
                <IconContainer>
                    <MobilePhone />
                </IconContainer>
                <div>
                    <Systemtittel className="lenkepanel__heading">
                        {inngang.innsendingsvalg.digital.cards.digital_klage.title}
                    </Systemtittel>
                    <MarginTopContainer>
                        <Normaltekst>{inngang.innsendingsvalg.digital.cards.digital_klage.description}</Normaltekst>
                    </MarginTopContainer>
                </div>
            </LenkePanelContentWithImage>
        </KlageLinkPanel>
    );
};
