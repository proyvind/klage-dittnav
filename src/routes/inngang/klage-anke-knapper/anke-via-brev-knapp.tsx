import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { klageFormUrl, StringValue } from '../../../kategorier/kategorier';
import { LenkePanelContentWithImage, IconContainer, MarginTopContainer } from '../../../styled-components/common';
import LawBook from '../../../icons/LawBook';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    mailAnkeUrl?: StringValue;
}

export const AnkeViaBrevKnapp = ({ mailAnkeUrl }: Props) => {
    const lang = useLanguage();
    const { inngang } = useTranslation();

    return (
        <LenkepanelBase href={(mailAnkeUrl ?? klageFormUrl)[lang]} border>
            <LenkePanelContentWithImage>
                <IconContainer>
                    <LawBook />
                </IconContainer>
                <div>
                    <Systemtittel className="lenkepanel__heading">
                        {inngang.innsendingsvalg.digital.cards.anke.title}
                    </Systemtittel>
                    <MarginTopContainer>
                        <Normaltekst>{inngang.innsendingsvalg.digital.cards.anke.description}</Normaltekst>
                    </MarginTopContainer>
                </div>
            </LenkePanelContentWithImage>
        </LenkepanelBase>
    );
};
