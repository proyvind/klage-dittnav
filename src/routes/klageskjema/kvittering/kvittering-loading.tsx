import React from 'react';
import { ContentContainer, CenteredContainer, MarginContainer } from '../../../styled-components/common';
import Envelope from '../../../assets/images/icons/Envelope';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import styled, { keyframes } from 'styled-components/macro';

interface Props {
    informStillWorking: boolean;
}

const KvitteringLoading = (props: Props) => (
    <ContentContainer>
        <CenteredContainer>
            <MarginContainer>
                <BouncingEnvelope />
            </MarginContainer>

            <MarginContainer>
                <Systemtittel>Sender inn klage...</Systemtittel>
            </MarginContainer>

            {props.informStillWorking && (
                <MarginContainer>
                    <Normaltekst>Jobber fortsatt...</Normaltekst>
                </MarginContainer>
            )}
        </CenteredContainer>
    </ContentContainer>
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
    animation-duration: 1.5s;
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-name: ${bounce};
`;

export default KvitteringLoading;
