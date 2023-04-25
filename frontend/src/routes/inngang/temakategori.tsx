import { Heading } from '@navikt/ds-react';
import React, { memo } from 'react';
import { useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '@app/components/personalised-content/personalised-content';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { usePageInit } from '@app/hooks/use-page-init';
import { ITemakategori } from '@app/kategorier/kategorier';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  tema: ITemakategori;
}

export const Temakategori = memo(
  ({ tema }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    const [title] = useInnsendingsytelseName(tema.innsendingsytelse);
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    useBreadcrumbs([], title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading spacing level="1" size="xlarge">
            {title}
          </CenteredHeading>

          <InngangGuidePanel />

          <DraftKlageAndAnkeLists innsendingsytelser={[tema.innsendingsytelse]} />

          <InngangPanel as="section">
            <Heading spacing level="2" size="large">
              {inngang.kategorier.title}
            </Heading>
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) => prevProps.tema === nextProps.tema
);

Temakategori.displayName = 'Temakategori';
