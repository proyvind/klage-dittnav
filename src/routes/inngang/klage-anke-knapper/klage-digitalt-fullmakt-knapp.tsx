import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { KlageLinkPanel } from '../../../link/link';
import { LenkePanelContentWithImage, IconContainer, MarginTopContainer } from '../../../styled-components/common';
import MobilePhoneIdCard from '../../../icons/MobilePhoneIdCardIcon';
import { useTranslation } from '../../../language/use-translation';

export const KlageDigitaltFullmaktKnapp = () => {
    const { inngang } = useTranslation();

    return (
        <KlageLinkPanel href={`${window.location.pathname}/fullmakt`} border>
            <LenkePanelContentWithImage>
                <IconContainer>
                    <MobilePhoneIdCard />
                </IconContainer>
                <div>
                    <Systemtittel className="lenkepanel__heading">
                        {inngang.innsendingsvalg.digital.cards.fullmakt.title}
                    </Systemtittel>
                    <MarginTopContainer>
                        <Normaltekst>{inngang.innsendingsvalg.digital.cards.fullmakt.description}</Normaltekst>
                    </MarginTopContainer>
                </div>
            </LenkePanelContentWithImage>
        </KlageLinkPanel>
    );
};
