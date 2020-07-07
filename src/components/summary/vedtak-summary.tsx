import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';
import { Klage } from '../../types/klage';

const VEDTAK_OPPLYSNINGER_POINTS = [
    { displayName: 'NAV-referanse', content: (klage: Klage) => <Normaltekst>{klage.referanse}</Normaltekst> },
    {
        displayName: 'Vedtaksdato',
        content: (klage: Klage) => <Normaltekst>{klage.vedtaksdato}</Normaltekst>
    },
    {
        displayName: 'NAV-enheten som har behandlet saken',
        content: (klage: Klage) => <Normaltekst>{klage.enhetId}</Normaltekst>
    }
];

interface Props {
    klage: Klage;
}

const VedtakSummary = (props: Props) => {
    return (
        <PointsFlexListContainer className="first-element-alone">
            {VEDTAK_OPPLYSNINGER_POINTS.map(point => {
                return (
                    <InformationPointBox
                        key={point.displayName}
                        header={point.displayName}
                        info={point.content(props.klage)}
                    />
                );
            })}
        </PointsFlexListContainer>
    );
};

export default VedtakSummary;
