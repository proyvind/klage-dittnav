import React from 'react';
import Paragraph from '../general/paragraph';
import ExternalLink from '../../assets/images/icons/ExternalLink';
import {
    FlexWithSpacingContainer,
    ButtonFlexContainer,
    CenteredContainer,
    Margin40TopContainer
} from '../../styled-components/main-styled-components';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp } from 'nav-frontend-knapper';
import BubbleChatInformation from '../../assets/images/icons/BubbleChatInformation';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';
import { getUrlToPaperForm } from '../../types/ytelse';

const ModalElektroniskId = () => {
    const history = useHistory();
    const { chosenYtelse } = useSelector((state: Store) => state);

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
                    <span>Slik skaffer du deg elektronisk ID.</span>
                    <ExternalLink />
                </Lenke>
            </FlexWithSpacingContainer>
            <Margin40TopContainer>
                <ButtonFlexContainer>
                    <Hovedknapp onClick={() => history.push(`klage`)}>Fortsett med elektronisk søknad</Hovedknapp>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={getUrlToPaperForm(chosenYtelse)}
                        className="knapp"
                    >
                        Gå til papirsøknaden
                    </a>
                </ButtonFlexContainer>
            </Margin40TopContainer>
        </div>
    );
};

export default ModalElektroniskId;
