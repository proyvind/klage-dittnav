import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';
import { dateToVedtakText, KlageSkjema } from '../../types/klage';

interface Props {
    klage: KlageSkjema;
}

const VedtakSummary = ({ klage }: Props) => (
    <PointsFlexListContainer>
        {getSaksnummer(klage.saksnummer)}
        <InformationPointBox header={'Vedtak'} info={<Normaltekst>{dateToVedtakText(klage)}</Normaltekst>} />
    </PointsFlexListContainer>
);

function getSaksnummer(saksnummer: string | null) {
    if (saksnummer === null) {
        return null;
    }
    return <InformationPointBox header={'Saksnummer'} info={<Normaltekst>{saksnummer}</Normaltekst>} />;
}

export default VedtakSummary;
