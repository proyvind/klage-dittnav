import React, { useMemo } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from './information-point-box';
import { SpaceBetweenFlexListContainer } from '../../../styled-components/common';
import { UpdateKlage } from '../../../klage/klage';
import { ISODate, isoDateToPretty } from '../../../date/date';

interface Props {
    klage: UpdateKlage;
}

const VedtakSummary = ({ klage }: Props) => (
    <SpaceBetweenFlexListContainer>
        {getSaksnummer(klage.saksnummer)}
        <InformationPointBox header={'Vedtak'}>
            <Normaltekst>{useDateToVedtakText(klage.vedtakDate)}</Normaltekst>
        </InformationPointBox>
    </SpaceBetweenFlexListContainer>
);

function getSaksnummer(saksnummer: string | null) {
    if (saksnummer === null) {
        return null;
    }
    return (
        <InformationPointBox header={'Saksnummer'}>
            <Normaltekst>{saksnummer}</Normaltekst>
        </InformationPointBox>
    );
}

const useDateToVedtakText = (isoDate: ISODate | null): string =>
    useMemo(() => {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return 'Ingen dato satt';
        }
        return prettyDate;
    }, [isoDate]);

export default VedtakSummary;
