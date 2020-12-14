import React, { useMemo } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from './information-point-box';
import { SpaceBetweenFlexListContainer } from '../../../styled-components/common';
import { UpdateKlage } from '../../../klage/klage';
import { ISODate, isoDateToPretty } from '../../../date/date';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    klage: UpdateKlage;
}

const VedtakSummary = ({ klage }: Props) => {
    const { klageskjema } = useTranslation();

    return (
        <SpaceBetweenFlexListContainer>
            <Saksnummer klage={klage} header={klageskjema.summary.sections.case.saksnummer} />
            <InformationPointBox header={klageskjema.summary.sections.case.vedtak}>
                <Normaltekst>
                    {useDateToVedtakText(klage.vedtakDate, klageskjema.summary.sections.case.no_date)}
                </Normaltekst>
            </InformationPointBox>
        </SpaceBetweenFlexListContainer>
    );
};

const SaksnummerText = ({ klage }: { klage: UpdateKlage }) => {
    const { klageskjema } = useTranslation();

    if (klage.userSaksnummer) {
        return (
            <Normaltekst>{`${klage.userSaksnummer} \u2013 ${klageskjema.summary.sections.case.given_by_user}`}</Normaltekst>
        );
    }
    if (klage.internalSaksnummer) {
        return (
            <Normaltekst>{`${klage.internalSaksnummer} \u2013 ${klageskjema.summary.sections.case.from_system}`}</Normaltekst>
        );
    }
    return <Normaltekst>{klageskjema.summary.sections.case.not_specified}</Normaltekst>;
};

const Saksnummer = ({ klage, header }: { klage: UpdateKlage; header: string }) => (
    <InformationPointBox header={header}>
        <SaksnummerText klage={klage} />
    </InformationPointBox>
);

const useDateToVedtakText = (isoDate: ISODate | null, noDateText: string): string =>
    useMemo(() => {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return noDateText;
        }
        return prettyDate;
    }, [isoDate, noDateText]);

export default VedtakSummary;
