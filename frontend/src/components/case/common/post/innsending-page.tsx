import { Button, GuidePanel, Heading } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAddress } from '@app/hooks/use-address';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { CenteredContainer } from '@app/styled-components/common';
import { Optional } from '../../../optional/optional';
import { PostFormContainer } from './post-form-container';

interface Props {
  pageIdentifier: PageIdentifier;
  skjema_post: Language['ankeskjema_post'] | Language['klageskjema_post'];
  innsendingsytelse: Innsendingsytelse;
  hasVedlegg: boolean;
}

export const RenderCaseinnsendingPage = ({ pageIdentifier, skjema_post, innsendingsytelse, hasVedlegg }: Props) => {
  useLogPageView(pageIdentifier);

  const { page_title, title_fragment, steps, title, stepTexts, address, common } = useTexts({
    skjema_post,
    innsendingsytelse,
  });

  return (
    <PostFormContainer
      activeStep={3}
      isValid
      page_title={page_title}
      steps={steps}
      innsendingsytelse={innsendingsytelse}
      title_fragment={title_fragment}
    >
      <Heading level="1" size="xlarge">
        {title}
      </Heading>
      <GuidePanel>
        <InstructionList>
          <ListItem>{stepTexts[0]}</ListItem>
          <ListItem>{stepTexts[1]}</ListItem>
          <Optional show={hasVedlegg}>
            <ListItem>{stepTexts[2]}</ListItem>
          </Optional>
          <ListItem>
            <span>
              {stepTexts[3]}
              <Address>
                {address[0]}
                <br />
                {address[1]}
                <br />
                {address[2]}
              </Address>
            </span>
          </ListItem>
        </InstructionList>
      </GuidePanel>
      <CenteredContainer>
        <Button as={Link} to="../oppsummering" variant="secondary">
          {common.back}
        </Button>
      </CenteredContainer>
    </PostFormContainer>
  );
};

interface Texts {
  title: string;
  page_title: string;
  title_fragment: string;
  common: Language['common'];
  steps: string[];
  stepTexts: string[];
  address: [string, string, string];
}

interface UseTextsProps {
  skjema_post: Props['skjema_post'];
  innsendingsytelse: Props['innsendingsytelse'];
}

const useTexts = ({ skjema_post, innsendingsytelse }: UseTextsProps): Texts => {
  const { common } = useTranslation();
  const { title, steg, steg_simple } = skjema_post.innsending;
  const { steps, title_fragment, page_title } = skjema_post.common;
  const address = useAddress(innsendingsytelse);

  return useMemo(() => {
    switch (innsendingsytelse) {
      case 'LONNSGARANTI':
        return {
          stepTexts: steg_simple,
          address,
          title,
          page_title,
          title_fragment,
          common,
          steps,
        };
      default:
        return {
          stepTexts: steg,
          address,
          title,
          page_title,
          title_fragment,
          common,
          steps,
        };
    }
  }, [address, common, innsendingsytelse, page_title, steg, steg_simple, steps, title, title_fragment]);
};

const InstructionList = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  align-items: flex-start;
  grid-template-columns: min-content 1fr;
  column-gap: 8px;
  counter-increment: li;

  &::before {
    content: counter(li) '.';
  }
`;

const Address = styled.address`
  display: block;
`;
