import React from 'react';
import styled from 'styled-components';
import desk_lamp from '../../assets/images/icons/desklamp.svg';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { FlexContainer } from '../../styled-components/main-styled-components';
import { useHistory } from 'react-router-dom';

export const Header = styled.div`
    background-color: #c1b5d0;
`;

interface Props {
    ytelse: string;
}

const InngangInfoBox = (props: Props) => {
    const history = useHistory();

    return (
        <div>
            <Header>
                <img src={desk_lamp} alt="Desk lamp" />
            </Header>
            <div>
                <Systemtittel>Klage - Engangsstønad ved fødsel</Systemtittel>
                <Normaltekst>
                    For å fullføre skjema for klage eller anke må du logge inn med elektronisk ID. Hvis du søker på
                    vegne av andre må du fylle inn personopplysninger manuelt.{' '}
                </Normaltekst>
                <Normaltekst>Les mer om dine klagerettigheter på våre tema-sider.</Normaltekst>
            </div>
            <FlexContainer>
                <Hovedknapp onClick={() => history.push(`${props.ytelse}/klage`)}>
                    Fortsett til innlogget skjema
                </Hovedknapp>
                <Knapp>Jeg klager på vegne av andre</Knapp>
            </FlexContainer>
            <Normaltekst>Jeg har ikke elektronisk ID</Normaltekst>
        </div>
    );
};

export default InngangInfoBox;
