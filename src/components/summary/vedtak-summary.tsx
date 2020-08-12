import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';
import { Klage } from '../../types/klage';

interface Props {
    klage: Klage;
}

interface VedtakOpplysningPoint {
    displayName: string;
    content: any;
}

const VEDTAK_OPPLYSNINGER_POINTS: VedtakOpplysningPoint[] = [
    { displayName: 'Saksnummer', content: (klage: Klage) => <Normaltekst>{klage.referanse ?? ''}</Normaltekst> },
    {
        displayName: 'Vedtak',
        content: (klage: Klage) => <Normaltekst>{klage.vedtaksdato ?? ''}</Normaltekst>
    }
];

const VedtakSummary = (props: Props) => {
    const emptyReferanse = (point: VedtakOpplysningPoint) => {
        return point.displayName === 'Saksnummer' && !props.klage.referanse;
    };

    return (
        <PointsFlexListContainer>
            {VEDTAK_OPPLYSNINGER_POINTS.map(point => {
                if (emptyReferanse(point)) {
                    return null;
                }
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
