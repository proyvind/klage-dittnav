import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';
import { Klage } from '../../types/klage';

const VEDTAK_OPPLYSNINGER_POINTS = [
    { displayName: 'Saksnummer', content: (klage: Klage) => <Normaltekst>{klage.referanse ?? ''}</Normaltekst> },
    {
        displayName: 'Vedtak',
        content: (klage: Klage) => <Normaltekst>{klage.vedtaksdato ?? ''}</Normaltekst>
    }
];

interface Props {
    klage: Klage;
}

const VedtakSummary = (props: Props) => {
    return (
        <PointsFlexListContainer>
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
