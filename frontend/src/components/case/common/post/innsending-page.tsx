import { Button, GuidePanel, Heading } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAddress } from '@app/hooks/use-address';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { CaseType } from '@app/redux-api/case/types';
import { CenteredContainer } from '@app/styled-components/common';
import { PostFormContainer } from './post-form-container';

interface Props {
  type: CaseType;
  innsendingsytelse: Innsendingsytelse;
  hasVedlegg: boolean;
}

export const RenderCaseinnsendingPage = ({ type, innsendingsytelse, hasVedlegg }: Props) => {
  const { skjema } = useTranslation();
  const { page_title, title_fragment, title, stepTexts, address, common } = useTexts({
    type,
    innsendingsytelse,
  });

  return (
    <PostFormContainer
      activeStep={3}
      isValid
      page_title={page_title}
      steps={skjema.steps[type]}
      innsendingsytelse={innsendingsytelse}
      title_fragment={title_fragment}
    >
      <Heading level="1" size="medium">
        {title}
      </Heading>
      <GuidePanel>
        <InstructionList>
          <ListItem>{stepTexts[0]}</ListItem>
          <ListItem>{stepTexts[1]}</ListItem>
          {hasVedlegg ? <ListItem>{stepTexts[2]}</ListItem> : null}
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
  innsendingsytelse: Props['innsendingsytelse'];
  type: CaseType;
}

const useTexts = ({ innsendingsytelse, type }: UseTextsProps): Texts => {
  const { common, skjema, innsending } = useTranslation();
  const { title, steg, steg_simple } = innsending;
  const { title_fragment, page_title } = skjema.common;
  const address = useAddress(innsendingsytelse);

  return useMemo(() => {
    switch (innsendingsytelse) {
      case 'LONNSGARANTI':
        return {
          stepTexts: steg_simple[type],
          address,
          title,
          page_title: page_title[type],
          title_fragment: title_fragment[type],
          common,
          steps: skjema.steps[type],
        };
      default:
        return {
          stepTexts: steg[type],
          address,
          title,
          page_title: page_title[type],
          title_fragment: title_fragment[type],
          common,
          steps: skjema.steps[type],
        };
    }
  }, [address, common, innsendingsytelse, page_title, skjema.steps, steg, steg_simple, title, title_fragment, type]);
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
