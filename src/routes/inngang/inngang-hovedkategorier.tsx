import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederIcon from '../../icons/VeilederIcon';
import { INNGANG_KATEGORIER } from '../../kategorier/kategorier';
import { KlageFlexLinkPanel } from '../../link/link';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PointsFlexListContainer } from '../../styled-components/common';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { PageTitle } from '../../styled-components/page-title';
import { InlineRow } from '../../styled-components/row';
import { WhiteSection } from '../../styled-components/white-section';
import { SectionTitle } from '../../styled-components/section-title';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';

export const title = 'Klage eller anke på vedtak';

const InngangHovedkategorier = () => {
    useLogPageView(PageIdentifier.INNGANG_HOVEDKATEGORIER);
    usePageInit(title);
    useBreadcrumbs([], null);

    return (
        <InngangMainContainer>
            <ContentContainer>
                <PageTitle>{title}</PageTitle>
                <InlineRow>
                    <Veilederpanel type={'plakat'} fargetema={'info'} kompakt svg={<VeilederIcon />}>
                        <Normaltekst>
                            Hvis du har fått et vedtak fra NAV og du er uenig i vedtaket, har du rett til å klage. Start
                            med å velge hvilket tema saken gjelder.
                        </Normaltekst>
                    </Veilederpanel>
                </InlineRow>

                <WhiteSection>
                    <SectionTitle>Hvilket område gjelder det?</SectionTitle>
                    <PointsFlexListContainer>{getLinks()}</PointsFlexListContainer>
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const getLinks = () =>
    INNGANG_KATEGORIER.map(({ title, path, beskrivelse }) => (
        <KlageFlexLinkPanel key={title} href={`/${path}`} border>
            <div>
                <Undertittel className="lenkepanel__heading">{title}</Undertittel>
                <Normaltekst>{beskrivelse}</Normaltekst>
            </div>
        </KlageFlexLinkPanel>
    ));

export default InngangHovedkategorier;
