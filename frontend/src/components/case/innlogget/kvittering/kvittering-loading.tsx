import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { keyframes, styled } from 'styled-components';
import { Envelope } from '@app/icons/envelope';
import { useTranslation } from '@app/language/use-translation';
import { CaseType } from '@app/redux-api/case/types';

interface Props {
  informStillWorking: boolean;
  type: CaseType;
}

export const KvitteringLoading = ({ informStillWorking, type }: Props) => {
  const { skjema } = useTranslation();

  return (
    <>
      <BouncingEnvelope />
      <PageTitle size="medium" level="1" spacing>
        {skjema.kvittering.loading.title[type]}
      </PageTitle>
      {informStillWorking ? <Description>{skjema.kvittering.loading.still_working}</Description> : null}
    </>
  );
};

const bounce = keyframes`
    0%,100% {
        -webkit-transform: translateY(0);
    }
    50% {
        -webkit-transform: translateY(-10px);
    }
`;

const BouncingEnvelope = styled(Envelope)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: ${bounce};
`;

const PageTitle = styled(Heading)`
  && {
    text-align: center;
  }
`;

const Description = styled(BodyShort)`
  && {
    text-align: center;
  }
`;
