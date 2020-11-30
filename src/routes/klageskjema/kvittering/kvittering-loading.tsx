import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Envelope from '../../../icons/EnvelopeIcon';

interface Props {
    informStillWorking: boolean;
}

const KvitteringLoading = (props: Props) => (
    <>
        <BouncingEnvelope />
        <PageTitle>Sender inn klage...</PageTitle>
        {props.informStillWorking && <Description>Jobber fortsatt...</Description>}
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

const PageTitle = styled(Systemtittel)`
    && {
        margin-top: 0;
        margin-bottom: 16px;
        text-align: center;
    }
`;

const Description = styled(Normaltekst)`
    && {
        text-align: center;
    }
`;

export default KvitteringLoading;
