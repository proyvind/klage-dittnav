import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from './information-point-box';
import { PointsFlexListContainer } from '../../../styled-components/common';
import { dateToVedtakText, UpdateKlage } from '../../../klage/klage';

interface Props {
    klage: UpdateKlage;
}

const VedtakSummary = ({ klage }: Props) => (
    <PointsFlexListContainer>
        {getSaksnummer(klage.saksnummer)}
        <InformationPointBox
            header={'Vedtak'}
            info={<Normaltekst>{dateToVedtakText(klage.vedtakType, klage.vedtakDate)}</Normaltekst>}
        />
    </PointsFlexListContainer>
);

function getSaksnummer(saksnummer: string | null) {
    if (saksnummer === null) {
        return null;
    }
    return <InformationPointBox header={'Saksnummer'} info={<Normaltekst>{saksnummer}</Normaltekst>} />;
}

export default VedtakSummary;
