import { BodyLong, GuidePanel } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { useTitleOrYtelse } from '../../hooks/use-titles';
import { InngangKategori, StringValue } from '../../kategorier/kategorier';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { usePageInit } from '../../page-init/page-init';
import { InngangMainContainer } from '../../styled-components/main-container';
import { InlineRow } from '../../styled-components/row';
import { TemaKey } from '../../tema/tema';
import { AnkeViaBrevKnapp } from './klage-anke-knapper/anke-via-brev-knapp';
import { KlageViaBrevKnapp } from './klage-anke-knapper/klage-via-brev-knapp';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  temaKey: TemaKey;
  titleKey: string;
  allowsAnke: boolean;
  mailKlageUrl?: StringValue;
  mailAnkeUrl?: StringValue;
  inngangkategori: InngangKategori;
}

export const InngangInnsendingPost = React.memo(
  ({ temaKey, titleKey, inngangkategori, allowsAnke, mailKlageUrl, mailAnkeUrl }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_POST, temaKey, titleKey);
    const title = useTitleOrYtelse(temaKey, titleKey);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    const breadcrumbs: Breadcrumb[] = [
      {
        title: inngangkategori.title[lang],
        url: `/${lang}/${inngangkategori.path}`,
        handleInApp: true,
      },
    ];
    useBreadcrumbs(breadcrumbs, title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading level="1" size="large" spacing>
            {title}
          </CenteredHeading>

          <InngangPanel as="section">
            <CenteredHeading level="1" size="small" spacing>
              {inngang.innsendingsvalg.post.title}
            </CenteredHeading>
            <StyledGuidePanel poster>
              <BodyLong spacing>{inngang.innsendingsvalg.post.description}</BodyLong>
            </StyledGuidePanel>
            <InlineRow>
              <KlageViaBrevKnapp mailKlageUrl={mailKlageUrl} />
            </InlineRow>
            {allowsAnke && mailAnkeUrl && (
              <InlineRow>
                <AnkeViaBrevKnapp mailAnkeUrl={mailAnkeUrl} />
              </InlineRow>
            )}
            <div>
              {inngang.innsendingsvalg.common.read_more} {inngang.innsendingsvalg.common.estimate}
            </div>
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) => prevProps.temaKey === nextProps.temaKey && prevProps.titleKey === nextProps.titleKey
);

InngangInnsendingPost.displayName = 'InngangInnsendingPost';

const StyledGuidePanel = styled(GuidePanel)`
  margin-bottom: 32px;
`;
