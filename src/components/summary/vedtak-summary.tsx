import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';
import { formatDate } from '../../utils/date-util';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';

const VEDTAK_OPPLYSNINGER_POINTS = [
    { displayName: 'Tittel', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.tittel || ''}</Normaltekst> },
    {
        displayName: 'Vedtaksdato',
        content: (vedtak: Vedtak) => <Normaltekst>{formatDate(vedtak.vedtaksdato)}</Normaltekst>
    },
    { displayName: 'Tema', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.tema}</Normaltekst> },
    { displayName: 'Enhet', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.enhet}</Normaltekst> },
    { displayName: 'NAV-referanse', content: (vedtak: Vedtak) => <Normaltekst>{vedtak.NAV_referanse}</Normaltekst> }
];

interface Props {
    vedtak: Vedtak;
}

const VedtakSummary = (props: Props) => {
    return (
        <PointsFlexListContainer>
            {VEDTAK_OPPLYSNINGER_POINTS.map(point => {
                return (
                    <InformationPointBox
                        key={point.displayName}
                        header={point.displayName}
                        info={point.content(props.vedtak)}
                    />
                );
            })}
        </PointsFlexListContainer>
    );
};

export default VedtakSummary;
