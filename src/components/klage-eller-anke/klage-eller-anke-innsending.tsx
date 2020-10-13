import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import BookWithShield from '../../assets/images/icons/BookWithShield';
import LetterOpened from '../../assets/images/icons/LetterOpened';
import { Margin40Container, MarginContainer, MarginTopContainer } from '../../styled-components/main-styled-components';
import { ensureStringIsTema, Tema, TemaKey } from '../../types/tema';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import MobilePhone from '../../assets/images/icons/MobilePhone';
import { RouteComponentProps } from 'react-router-dom';
import { getKategori, hasDigitalForm } from '../../data/klage-eller-anke-temaer';
import NotFoundPage from '../../pages/not-found/not-found-page';
import KlageLinkPanel from '../link/link';

interface MatchParams {
    kategori: string;
    tema: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const KlageEllerAnkeInnsending = (props: Props) => {
    const kategori = getKategori(props.match.params.kategori);
    if (kategori === null) {
        return <NotFoundPage />;
    }

    const tema = ensureStringIsTema(props.match.params.tema);
    if (tema === null) {
        return <NotFoundPage />;
    }

    const isDigital = hasDigitalForm(kategori, tema);

    const ytelse = Tema[tema];

    return (
        <div>
            <Sidetittel>{ytelse}</Sidetittel>
            <Margin40Container>
                <Intro isDigital />
            </Margin40Container>
            <DigitalContent isDigital={isDigital} tema={tema} />
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
            <Lenke
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
            >
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
