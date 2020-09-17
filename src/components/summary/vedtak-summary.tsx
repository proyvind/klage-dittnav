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
    content: (klage: Klage) => React.ReactElement<Normaltekst>;
}

const VEDTAK_OPPLYSNINGER_POINTS: VedtakOpplysningPoint[] = [
    {
        displayName: 'Saksnummer',
        content: (klage: Klage) => <Normaltekst>{klage.saksnummer ?? ''}</Normaltekst>
    },
    {
        displayName: 'Vedtak',
        content: (klage: Klage) => <Normaltekst>{klage.vedtak ?? ''}</Normaltekst>
    }
];

const emptyReferanse = (point: VedtakOpplysningPoint, props: Props) => {
    return point.displayName === 'Saksnummer' && !props.klage.saksnummer;
};

const VedtakSummary = (props: Props) => {
    return (
        <PointsFlexListContainer>
            {VEDTAK_OPPLYSNINGER_POINTS.map(point => {
                if (emptyReferanse(point, props)) {
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
