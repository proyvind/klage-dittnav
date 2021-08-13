import React, { useMemo } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from './information-point-box';
import { ISODate, isoDateToPretty } from '../../../date/date';
import { useTranslation } from '../../../language/use-translation';
import { Anke } from '../../../store/anke/types/anke';

interface Props {
    anke: Anke;
}

const VedtakSummary = ({ anke }: Props) => {
    const { ankeskjema } = useTranslation();

    return (
        <InformationPointBox header={ankeskjema.summary.sections.case.vedtak}>
            <Normaltekst>{useDateToVedtakText(anke.vedtakDate, ankeskjema.summary.sections.case.no_date)}</Normaltekst>
        </InformationPointBox>
    );
};

const useDateToVedtakText = (isoDate: ISODate | null, noDateText: string): string =>
    useMemo(() => {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return noDateText;
        }
        return prettyDate;
    }, [isoDate, noDateText]);

export default VedtakSummary;
