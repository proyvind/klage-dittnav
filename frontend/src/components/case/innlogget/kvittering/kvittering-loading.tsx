import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { keyframes, styled } from 'styled-components';
import { Envelope } from '@app/icons/envelope';
import { Language } from '@app/language/language';
import { Optional } from '../../../optional/optional';

interface Props {
  informStillWorking: boolean;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const KvitteringLoading = ({ translations, informStillWorking }: Props) => (
  <>
    <BouncingEnvelope />
    <PageTitle size="medium" level="1" spacing>
      {translations.kvittering.loading.title}
    </PageTitle>
    <Optional show={informStillWorking}>
      <Description>{translations.kvittering.loading.still_working}</Description>
    </Optional>
  </>
);

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
