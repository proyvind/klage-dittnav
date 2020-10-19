import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BookWithShield from '../../assets/images/icons/BookWithShield';
import LetterOpened from '../../assets/images/icons/LetterOpened';
import { Margin40Container, MarginContainer, MarginTopContainer } from '../../styled-components/main-styled-components';
import { Tema, TemaKey } from '../../types/tema';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import MobilePhone from '../../assets/images/icons/MobilePhone';
import { hasDigitalForm } from '../../data/klage-eller-anke-temaer';
import KlageLinkPanel from '../link/link';

const KlageEllerAnkeInnsending = (temaKey: TemaKey) => {
    const isDigital = hasDigitalForm(temaKey);
    const temaTittel = Tema[temaKey];

    return (
        <div>
            <Sidetittel>{temaTittel}</Sidetittel>
            <Margin40Container>
                <Intro isDigital />
            </Margin40Container>
            <DigitalContent isDigital={isDigital} tema={temaKey} />
            <Margin40Container>
                <LenkepanelBase href="#" border>
                    <div className="lenkepanel-content-with-image">
                        <div className="icon-container">
                            <LetterOpened />
                        </div>
                        <div>
                            <Systemtittel className="lenkepanel__heading">Klage på vegne av andre</Systemtittel>
                            <MarginTopContainer>
                                <Normaltekst>
                                    For å klage på vegne av andre fyller du ut et skjema som sendes via post.
                                </Normaltekst>
                            </MarginTopContainer>
                        </div>
                    </div>
                </LenkepanelBase>
                <LenkepanelBase href="#" border>
                    <div className="lenkepanel-content-with-image">
                        <div className="icon-container">
                            <BookWithShield />
                        </div>
                        <div>
                            <Systemtittel className="lenkepanel__heading">Innsending av anke</Systemtittel>
                            <MarginTopContainer>
                                <Normaltekst>
                                    For å sende inn en anke fyller du et skjema som sendes via post.
                                </Normaltekst>
                            </MarginTopContainer>
                        </div>
                    </div>
                </LenkepanelBase>
            </Margin40Container>

            <div>
                Les mer om{' '}
                <Lenke
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
                >
                    dine klagerettigheter på våre tema-sider
                </Lenke>
                .
            </div>
        </div>
    );
};

interface DigitalContentProps {
    isDigital: boolean;
    tema: TemaKey;
}

const DigitalContent = (props: DigitalContentProps) => {
    if (!props.isDigital) {
        return null;
    }
    return (
        <MarginContainer>
            <KlageLinkPanel href={'/klage?tema=' + props.tema} border>
                <div className="lenkepanel-content-with-image">
                    <div className="icon-container">
                        <MobilePhone />
                    </div>
                    <div>
                        <Systemtittel className="lenkepanel__heading">Innsending av klage</Systemtittel>
                        <MarginTopContainer>
                            <Normaltekst>For å sende inn digitalt må du logge inn med elektronisk ID.</Normaltekst>
                        </MarginTopContainer>
                    </div>
                </div>
            </KlageLinkPanel>
            <Lenke target="_blank" rel="noopener noreferrer" href="https://www.norge.no/elektronisk-id">
                Jeg har ikke elektronisk ID
            </Lenke>
        </MarginContainer>
    );
};

interface IntroProps {
    isDigital: boolean;
}

const Intro = ({ isDigital }: IntroProps) => (isDigital ? <IntroDigital /> : <IntroPost />);

const IntroDigital = () => (
    <Normaltekst>
        For å fylle ut og sende inn en klage må du logge inn med elektronisk ID. Hvis du skal sende en anke eller du
        skal søke på vegne av andre må du fylle inn personopplysninger manuelt og sende skjema i posten.
    </Normaltekst>
);

const IntroPost = () => (
    <div>
        <Systemtittel>Innsending via post</Systemtittel>
        <MarginTopContainer>
            <Normaltekst>
                Klage eller anke på denne tjenesten krever at du må du sende inn via post. Veiviseren hjelper deg med
                utfylling av en førsteside og klageskjema. Dette må du skrive ut ut og sende inn til den adressen som
                står på førstesiden, sammen med kopi av eventuelle andre dokumenter eller kvitteringer.
            </Normaltekst>
        </MarginTopContainer>
    </div>
);

export default KlageEllerAnkeInnsending;
