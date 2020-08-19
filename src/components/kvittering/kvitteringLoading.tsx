import React from 'react';
import { ContentContainer, CenteredContainer, MarginContainer } from '../../styled-components/main-styled-components';
import Envelope from '../../assets/images/icons/Envelope';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    informStillWorking: boolean;
}

const KvitteringLoading = (props: Props) => {
    return (
        <ContentContainer>
            <CenteredContainer>
                <MarginContainer>
                    <div className="animated bounce">
                        <Envelope />
                    </div>
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
};

export default KvitteringLoading;
