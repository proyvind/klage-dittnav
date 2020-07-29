import React from 'react';
import { ContentContainer, CenteredContainer, MarginContainer } from '../../styled-components/main-styled-components';
import Envelope from '../../assets/images/icons/Envelope';
import { Systemtittel } from 'nav-frontend-typografi';

const KvitteringLoading = () => {
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
            </CenteredContainer>
        </ContentContainer>
    );
};

export default KvitteringLoading;
