import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import LetterOpened from '../../icons/LetterOpenedIcon';
import { IconContainer, LenkePanelContentWithImage, MarginTopContainer } from '../../styled-components/common';
import MobilePhone from '../../icons/MobilePhoneIcon';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PageIdentifier } from '../../logging/amplitude';
import { ExternalLink, KlageLinkPanel } from '../../link/link';
import { TemaKey, Tema } from '../../tema/tema';
import { getUrlToPaperForm } from '../../tema/ytelse';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { PageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { InlineRow } from '../../styled-components/row';

interface Props {
    temaKey: TemaKey;
    title?: string;
    saksnummer?: string | null;
}

const InngangInnsendingDigital = ({ temaKey, title = Tema[temaKey], saksnummer = null }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, temaKey, title);
    const paperUrl = getUrlToPaperForm(temaKey);

    return (
        <InngangMainContainer>
            <ContentContainer>
                <PageTitle>{title}</PageTitle>
                <WhiteSection>
                    <DigitalContent temaKey={temaKey} title={title} saksnummer={saksnummer} />
                    <InlineRow>
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
                    </InlineRow>
                    Les mer om{' '}
                    <ExternalLink href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter">
                        dine klagerettigheter på våre tema-sider
                    </ExternalLink>
                    .
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
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
        <InlineRow>
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
            <ExternalLink href="https://www.norge.no/elektronisk-id">Slik skaffer du deg elektronisk ID</ExternalLink>
        </InlineRow>
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
