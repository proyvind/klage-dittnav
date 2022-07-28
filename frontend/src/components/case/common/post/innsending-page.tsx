import { Button, GuidePanel, Heading } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Data, useErrors } from '../../../../hooks/use-errors';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { CenteredContainer } from '../../../../styled-components/common';
import { Optional } from '../../../optional/optional';
import { PostFormContainer } from './post-form-container';

type Props = Data;

export const RenderCaseinnsendingPage = (props: Props) => {
  const { caseData, type } = props;
  const isKlage = type === 'klage' || type === 'session-klage';
  const pageIdentifier = isKlage ? PageIdentifier.KLAGESKJEMA_INNSENDING : PageIdentifier.ANKESKJEMA_INNSENDING;
  useLogPageView(pageIdentifier);
  const { klageskjema_post, ankeskjema_post, common } = useTranslation();
  const navigate = useNavigate();

  const skjema_post = isKlage ? klageskjema_post : ankeskjema_post;

  const { title, steg } = skjema_post.innsending;

  const { isValid } = useErrors(props);

  useEffect(() => {
    if (!isValid) {
      navigate('../begrunnelse', { replace: true });
    }
  }, [isValid, navigate]);

  const { steps, title_fragment, page_title } = isKlage ? klageskjema_post.common : ankeskjema_post.common;

  const titleKey = type === 'klage' || type === 'session-klage' ? caseData.titleKey : null;

  return (
    <PostFormContainer
      activeStep={3}
      isValid
      page_title={page_title}
      steps={steps}
      temaKey={caseData.tema}
      title_fragment={title_fragment}
      titleKey={titleKey}
    >
      <Heading level="1" size="xlarge">
        {title}
      </Heading>
      <GuidePanel>
        <InstructionList>
          <ListItem>{steg[0]}</ListItem>
          <ListItem>{steg[1]}</ListItem>
          <Optional show={caseData.hasVedlegg}>
            <ListItem>{steg[2]}</ListItem>
          </Optional>
          <ListItem>
            <span>
              {steg[3]}
              <Address>
                NAV skanning
                <br />
                Postboks 1400
                <br />
                0109 Oslo
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
