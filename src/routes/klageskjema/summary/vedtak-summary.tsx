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
        {getSaksnummer(klage)}
        <InformationPointBox header={'Vedtak'}>
            <Normaltekst>{useDateToVedtakText(klage.vedtakDate)}</Normaltekst>
        </InformationPointBox>
    </SpaceBetweenFlexListContainer>
);

const getSaksnummerText = (klage: UpdateKlage) => {
    if (klage.userSaksnummer) {
        return `${klage.userSaksnummer} \u2013 Oppgitt av bruker`;
    }
    if (klage.internalSaksnummer) {
        return `${klage.internalSaksnummer} \u2013 Hentet fra internt system`;
    }
    return 'Ikke angitt';
};

function getSaksnummer(klage: UpdateKlage) {
    return (
        <InformationPointBox header={'Saksnummer'}>
            <Normaltekst>{getSaksnummerText(klage)}</Normaltekst>
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
