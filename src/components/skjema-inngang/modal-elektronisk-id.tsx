import React from 'react';
import Paragraph from '../general/paragraph';
import ExternalLink from '../../assets/images/icons/ExternalLink';
import {
    FlexWithSpacingContainer,
    ButtonFlexContainer,
    CenteredContainer,
    Margin48TopContainer
} from '../../styled-components/main-styled-components';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp } from 'nav-frontend-knapper';
import BubbleChatInformation from '../../assets/images/icons/BubbleChatInformation';
import { useHistory } from 'react-router-dom';
import { getUrlToPaperForm } from '../../types/ytelse';
import queryString from 'query-string';

interface Props {
    query: queryString.ParsedQuery<string>;
}

const ModalElektroniskId = (props: Props) => {
    const history = useHistory();

    return (
        <div style={{ padding: '20px' }}>
            <CenteredContainer>
                <BubbleChatInformation />
            </CenteredContainer>
            <Paragraph>
                Du vil få raskere svar på søknaden din hvis du søker elektronisk i stedet for å sende papirskjema i
                posten.
            </Paragraph>
            <Paragraph noSpaceOn={'bottom'}>
                For å søke på nett må du ha bank-id fra banken din eller en annen elektronisk id.
            </Paragraph>
            <FlexWithSpacingContainer>
                <Lenke target="_blank" rel="noopener noreferrer" href="https://www.norge.no/elektronisk-id">
                    <span>Slik skaffer du deg elektronisk ID.</span>
                    <ExternalLink />
                </Lenke>
            </FlexWithSpacingContainer>
            <Margin48TopContainer>
                <ButtonFlexContainer>
                    <Hovedknapp
                        onClick={() =>
                            history.push('klage' + (props.query ? '?' + queryString.stringify(props.query) : ''))
                        }
                    >
                        Fortsett med elektronisk søknad
                    </Hovedknapp>
                    <a target="_blank" rel="noopener noreferrer" href={getUrlToPaperForm('FOR')} className="knapp">
                        Gå til papirsøknaden
                    </a>
                </ButtonFlexContainer>
            </Margin48TopContainer>
        </div>
    );
};

export default ModalElektroniskId;
