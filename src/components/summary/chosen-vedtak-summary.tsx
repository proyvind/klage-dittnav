import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';

const VEDTAK_OPPLYSNINGER_POINTS = [
    { displayName: 'Tittel', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.tittel}</Normaltekst> },
    { displayName: 'Vedtaksdato', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.vedtaksdato}</Normaltekst> },
    { displayName: 'Tema', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.tema}</Normaltekst> },
    { displayName: 'Enhet', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.enhet}</Normaltekst> },
    { displayName: 'NAV-referanse', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.NAV_referanse}</Normaltekst> }
];

const FlexRowContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    > div {
        flex-basis: 40%;
        margin-bottom: 20px;
    }
`;

interface Props {
    vedtak: Vedtak;
}

const ChosenVedtakSummary = (props: Props) => {
    return (
        <FlexRowContainer>
            {VEDTAK_OPPLYSNINGER_POINTS.map(point => {
                return (
                    <InformationPointBox
                        key={point.displayName}
                        header={point.displayName}
                        info={point.content(props.vedtak)}
                    />
                );
            })}
        </FlexRowContainer>
    );
};

export default ChosenVedtakSummary;
