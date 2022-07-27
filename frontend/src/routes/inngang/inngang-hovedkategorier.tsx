import { GuidePanel, Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { INNGANG_KATEGORIER } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { usePageInit } from '../../page-init/page-init';
import { InngangMainContainer } from '../../styled-components/main-container';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

export const InngangHovedkategorier = () => {
  useLogPageView(PageIdentifier.INNGANG_HOVEDKATEGORIER);
  const { inngang } = useTranslation();
  const { title } = inngang.hovedkategorier;
  usePageInit(title);
  useBreadcrumbs([], null);
  const language = useLanguage();

  return (
    <InngangMainContainer>
      <PanelContainer>
        <CenteredHeading spacing level="1" size="xlarge">
          {title}
        </CenteredHeading>
        <GuidePanel poster>{inngang.hovedkategorier.description}</GuidePanel>
        <InngangPanel as="section">
          <Heading spacing level="2" size="large">
            {inngang.hovedkategorier.chooseTema}
          </Heading>
          <LinkContainer>{getLinks(language)}</LinkContainer>
        </InngangPanel>
      </PanelContainer>
    </InngangMainContainer>
  );
};

const getLinks = (lang: Languages) =>
  INNGANG_KATEGORIER.map(({ title, path, beskrivelse, externalUrl }) => {
    if (externalUrl && typeof externalUrl[lang] === 'string') {
      return (
        <ExternalHovedkategoriLink
          key={externalUrl[lang]}
          title={title[lang]}
          beskrivelse={beskrivelse[lang]}
          externalUrl={externalUrl[lang]}
        />
      );
    }

    return (
      <LinkPanel key={title[lang]} as={NavLink} to={`/${lang}/${path}`} border>
        <LinkPanel.Title>{title[lang]}</LinkPanel.Title>
        <LinkPanel.Description>{beskrivelse[lang]}</LinkPanel.Description>
      </LinkPanel>
    );
  });

interface ExternalKategoriProps {
  title: string;
  beskrivelse: string;
  externalUrl: string;
}

const ExternalHovedkategoriLink = ({ title, beskrivelse, externalUrl }: ExternalKategoriProps) => (
  <LinkPanel href={externalUrl} border>
    <LinkPanel.Title>{title}</LinkPanel.Title>
    <LinkPanel.Description>{beskrivelse}</LinkPanel.Description>
  </LinkPanel>
);
