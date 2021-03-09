import React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Veileder from 'nav-frontend-veileder';
import LetterOpened from '../../icons/LetterOpenedIcon';
import { IconContainer, LenkePanelContentWithImage, MarginTopContainer } from '../../styled-components/common';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PageIdentifier } from '../../logging/amplitude';
import { TemaKey } from '../../tema/tema';
import VeilederIcon from '../../icons/VeilederIcon';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { CenteredSectionTitle } from '../../styled-components/section-title';
import { PageParagraph } from '../../styled-components/page-paragraph';
import { InlineRow } from '../../styled-components/row';
import { usePageInit } from '../../page-init/page-init';
import { InngangKategori, StringValue } from '../../kategorier/kategorier';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import LawBook from '../../icons/LawBook';
import { klageFormUrl } from '../../kategorier/kategorier';
import { useTitleOrYtelse } from '../../language/titles';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';

interface Props {
    temaKey: TemaKey;
    titleKey: string;
    allowsAnke: boolean;
    mailKlageUrl?: StringValue;
    mailAnkeUrl?: StringValue;
    inngangkategori: InngangKategori;
}

const InngangInnsendingPost = ({
    temaKey,
    titleKey,
    inngangkategori,
    allowsAnke,
    mailKlageUrl,
    mailAnkeUrl
}: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_POST, temaKey, titleKey);
    const title = useTitleOrYtelse(temaKey, titleKey);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    const breadcrumbs: Breadcrumb[] = [
        {
            title: inngangkategori.title[lang],
            url: `/${lang}/${inngangkategori.path}`,
            handleInApp: true
        }
    ];
    useBreadcrumbs(breadcrumbs, title);

    return (
        <InngangMainContainer>
            <ContentContainer>
                <CenteredPageTitle>{title}</CenteredPageTitle>
                <WhiteSection>
                    <CenteredSectionTitle>{inngang.innsendingsvalg.post.title}</CenteredSectionTitle>
                    <VeilederContainer fargetema={'info'}>
                        <VeilederIcon />
                    </VeilederContainer>
                    <PageParagraph>{inngang.innsendingsvalg.post.description}</PageParagraph>
                    <InlineRow>
                        <LenkepanelBase href={(mailKlageUrl ?? klageFormUrl)[lang]} target="_blank" border>
                            <LenkePanelContentWithImage>
                                <IconContainer>
                                    <LetterOpened />
                                </IconContainer>
                                <div>
                                    <Systemtittel className="lenkepanel__heading">
                                        {inngang.innsendingsvalg.post.cards.post.title}
                                    </Systemtittel>
                                    <MarginTopContainer>
                                        <Normaltekst>{inngang.innsendingsvalg.post.cards.post.description}</Normaltekst>
                                    </MarginTopContainer>
                                </div>
                            </LenkePanelContentWithImage>
                        </LenkepanelBase>
                    </InlineRow>
                    {allowsAnke && mailAnkeUrl && (
                        <InlineRow>
                            <LenkepanelBase href={mailAnkeUrl[lang]} target="_blank" border>
                                <LenkePanelContentWithImage>
                                    <IconContainer>
                                        <LawBook />
                                    </IconContainer>
                                    <div>
                                        <Systemtittel className="lenkepanel__heading">
                                            {inngang.innsendingsvalg.post.cards.anke.title}
                                        </Systemtittel>
                                        <MarginTopContainer>
                                            <Normaltekst>
                                                {inngang.innsendingsvalg.post.cards.anke.description}
                                            </Normaltekst>
                                        </MarginTopContainer>
                                    </div>
                                </LenkePanelContentWithImage>
                            </LenkepanelBase>
                        </InlineRow>
                    )}
                    {inngang.innsendingsvalg.common.read_more} {inngang.innsendingsvalg.common.estimate}
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const VeilederContainer = styled(Veileder)`
    && {
        margin-bottom: 32px;
    }
`;

const arePropsEqual = (prevProps: Props, nextProps: Props) =>
    prevProps.temaKey === nextProps.temaKey && prevProps.titleKey === nextProps.titleKey;

export default React.memo(InngangInnsendingPost, arePropsEqual);
