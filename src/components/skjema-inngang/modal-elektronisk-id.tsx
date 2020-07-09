import React from 'react';
import Paragraph from '../general/paragraph';
import ExternalLink from '../../assets/images/icons/ExternalLink';
import {
    FlexWithSpacingContainer,
    ButtonFlexContainer,
    CenteredContainer,
    DoubleMarginTopContainer
} from '../../styled-components/main-styled-components';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp } from 'nav-frontend-knapper';
import BubbleChatInformation from '../../assets/images/icons/BubbleChatInformation';

const ModalElektroniskId = () => {
    return (
        <div style={{ padding: '20px' }}>
            <CenteredContainer>
                <BubbleChatInformation />
            </CenteredContainer>
            <Paragraph>
                Du vil få raskere svar på søknaden din hvis du søker elektronisk i stedet for å sende papirskjema i
                posten.
            </Paragraph>
            <Paragraph noSpaceBottom={true}>
                For å søke på nett må du ha bank-id fra banken din eller en annen elektronisk id.
            </Paragraph>
            <FlexWithSpacingContainer>
                <Lenke target="_blank" rel="noopener noreferrer" href="https://www.norge.no/elektronisk-id">
                    Slik skaffer du deg elektronisk ID.
                </Lenke>
                <ExternalLink />
            </FlexWithSpacingContainer>
            <DoubleMarginTopContainer>
                <ButtonFlexContainer>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.nav.no/soknader/nb/klage/person"
                        className="knapp"
                    >
                        Gå til papirsøknaden
                    </a>
                    <Hovedknapp>Gå til søknaden</Hovedknapp>
                </ButtonFlexContainer>
            </DoubleMarginTopContainer>
        </div>
    );
};

export default ModalElektroniskId;
