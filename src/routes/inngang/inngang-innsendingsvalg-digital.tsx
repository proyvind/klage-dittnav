import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Lenke from 'nav-frontend-lenker';
import LetterOpened from '../../assets/images/icons/LetterOpened';
import {
    CenterInMobileContainer,
    IconContainer,
    LenkePanelContentWithImage,
    Margin40Container,
    Margin40TopContainer,
    MarginContainer,
    MarginTopContainer,
    WhiteBackgroundContainer
} from '../../styled-components/common';
import MobilePhone from '../../assets/images/icons/MobilePhone';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PageIdentifier } from '../../logging/amplitude';
import { KlageLinkPanel } from '../../link/link';
import { TemaKey, Tema } from '../../tema/tema';
import { getUrlToPaperForm } from '../../tema/ytelse';
import Layout from '../layout';

interface Props {
    temaKey: TemaKey;
    title?: string;
    saksnummer?: string | null;
}

const InngangInnsendingDigital = ({ temaKey, title = Tema[temaKey], saksnummer = null }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, temaKey, title);
    const paperUrl = getUrlToPaperForm(temaKey);

    return (
        <Layout backgroundColor="#e7e9e9">
            <Margin40TopContainer>
                <CenterInMobileContainer>
                    <Sidetittel>{title}</Sidetittel>
                </CenterInMobileContainer>
            </Margin40TopContainer>
            <Margin40TopContainer>
                <WhiteBackgroundContainer>
                    <DigitalContent temaKey={temaKey} title={title} saksnummer={saksnummer} />
                    <Margin40Container>
                        <LenkepanelBase href={paperUrl} border>
                            <LenkePanelContentWithImage>
                                <IconContainer>
                                    <LetterOpened />
                                </IconContainer>
                                <div>
                                    <Systemtittel className="lenkepanel__heading">Klage via post</Systemtittel>
                                    <MarginTopContainer>
                                        <Normaltekst>
                                            Klageskjema som sendes inn via post. Også for deg som skal klage på vegne av
                                            andre.
                                        </Normaltekst>
                                    </MarginTopContainer>
                                </div>
                            </LenkePanelContentWithImage>
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
                </WhiteBackgroundContainer>
            </Margin40TopContainer>
        </Layout>
    );
};

interface DigitalContentProps {
    temaKey: TemaKey;
    title: string;
    saksnummer: string | null;
}

const DigitalContent = ({ temaKey, title, saksnummer }: DigitalContentProps) => {
    const { search } = useLocation();
    if (saksnummer === null) {
        const query = queryString.parse(search);
        saksnummer = getQueryValue(query.saksnummer);
    }
    const query = queryString.stringify(
        {
            tema: temaKey,
            saksnummer,
            tittel: title
        },
        {
            skipNull: true
        }
    );

    return (
        <MarginContainer>
            <KlageLinkPanel href={`/ny?${query}`} border>
                <LenkePanelContentWithImage>
                    <IconContainer>
                        <MobilePhone />
                    </IconContainer>
                    <div>
                        <Systemtittel className="lenkepanel__heading">Klage digitalt</Systemtittel>
                        <MarginTopContainer>
                            <Normaltekst>For å sende inn digitalt må du logge inn med elektronisk ID.</Normaltekst>
                        </MarginTopContainer>
                    </div>
                </LenkePanelContentWithImage>
            </KlageLinkPanel>
            <Lenke target="_blank" rel="noopener noreferrer" href="https://www.norge.no/elektronisk-id">
                Slik skaffer du deg elektronisk ID
            </Lenke>
        </MarginContainer>
    );
};

function getQueryValue(queryValue: string | string[] | null | undefined) {
    if (typeof queryValue === 'string' && queryValue.length !== 0) {
        return queryValue;
    }
    return null;
}

const arePropsEqual = (prevProps: Props, nextProps: Props) =>
    prevProps.temaKey === nextProps.temaKey &&
    prevProps.saksnummer === nextProps.saksnummer &&
    prevProps.title === nextProps.title;

export default React.memo(InngangInnsendingDigital, arePropsEqual);