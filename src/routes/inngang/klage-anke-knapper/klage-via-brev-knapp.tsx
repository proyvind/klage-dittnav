import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { klageFormUrl, StringValue } from '../../../kategorier/kategorier';
import { LenkePanelContentWithImage, IconContainer, MarginTopContainer } from '../../../styled-components/common';
import LetterOpened from '../../../icons/LetterOpenedIcon';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    mailKlageUrl?: StringValue;
}

export const KlageViaBrevKnapp = ({ mailKlageUrl }: Props) => {
    const lang = useLanguage();
    const { inngang } = useTranslation();

    return (
        <LenkepanelBase href={(mailKlageUrl ?? klageFormUrl)[lang]} border>
            <LenkePanelContentWithImage>
                <IconContainer>
                    <LetterOpened />
                </IconContainer>
                <div>
                    <Systemtittel className="lenkepanel__heading">
                        {inngang.innsendingsvalg.digital.cards.post.title}
                    </Systemtittel>
                    <MarginTopContainer>
                        <Normaltekst>{inngang.innsendingsvalg.digital.cards.post.description}</Normaltekst>
                    </MarginTopContainer>
                </div>
            </LenkePanelContentWithImage>
        </LenkepanelBase>
    );
};
