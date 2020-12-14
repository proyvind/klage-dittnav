import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederIcon from '../../icons/VeilederIcon';
import { INNGANG_KATEGORIER } from '../../kategorier/kategorier';
import { KlageFlexLinkPanel } from '../../link/link';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { SpaceBetweenFlexListContainer } from '../../styled-components/common';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { InlineRow } from '../../styled-components/row';
import { WhiteSection } from '../../styled-components/white-section';
import { SectionTitle } from '../../styled-components/section-title';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { useTranslation } from '../../language/use-translation';
import { useLanguage } from '../../language/use-language';
import { Languages } from '../../language/language';

const InngangHovedkategorier = () => {
    useLogPageView(PageIdentifier.INNGANG_HOVEDKATEGORIER);
    const { inngang } = useTranslation();
    const title = inngang.hovedkategorier.title;
    usePageInit(title);
    useBreadcrumbs([], null);
    const language = useLanguage();

    return (
        <InngangMainContainer>
            <ContentContainer>
                <CenteredPageTitle>{title}</CenteredPageTitle>
                <InlineRow>
                    <Veilederpanel type={'plakat'} fargetema={'info'} kompakt svg={<VeilederIcon />}>
                        <Normaltekst>{inngang.hovedkategorier.description}</Normaltekst>
                    </Veilederpanel>
                </InlineRow>

                <WhiteSection>
                    <SectionTitle>{inngang.hovedkategorier.chooseTema}</SectionTitle>
                    <SpaceBetweenFlexListContainer>{getLinks(language)}</SpaceBetweenFlexListContainer>
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const getLinks = (lang: Languages) =>
    INNGANG_KATEGORIER.map(({ title, path, beskrivelse }) => (
        <KlageFlexLinkPanel key={title[lang]} href={`/${lang}/${path}`} border>
            <div>
                <Undertittel className="lenkepanel__heading">{title[lang]}</Undertittel>
                <Normaltekst>{beskrivelse[lang]}</Normaltekst>
            </div>
        </KlageFlexLinkPanel>
    ));

export default InngangHovedkategorier;
