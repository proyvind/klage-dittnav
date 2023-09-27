import { Home } from '@navikt/ds-icons';
import { Button, Heading } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';

export const NotFoundPage = () => {
  useLogPageView(PageIdentifier.NOT_FOUND);
  const navigate = useNavigate();
  const { not_found_page } = useTranslation();

  const onClick = () => navigate('/');

  return (
    <Container>
      <Heading size="xlarge" level="1">
        404
      </Heading>
      <Heading size="large" level="2">
        {not_found_page.title}
      </Heading>
      <StyledButton onClick={onClick} icon={<Home aria-hidden />}>
        {not_found_page.go_back}
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;
