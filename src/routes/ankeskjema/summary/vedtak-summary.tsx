import React, { useMemo } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import InformationPointBox from './information-point-box';
import { SpaceBetweenFlexListContainer } from '../../../styled-components/common';
import { ISODate, isoDateToPretty } from '../../../date/date';
import { useTranslation } from '../../../language/use-translation';
import { Anke } from '../../../store/anke/types/anke';

interface Props {
    anke: Anke;
}

const VedtakSummary = ({ anke }: Props) => {
    const { ankeskjema } = useTranslation();

    return (
        <SpaceBetweenFlexListContainer>
            <Saksnummer
                anke={anke}
                header={`${ankeskjema.summary.sections.case.saksnummer} (${ankeskjema.summary.sections.case.from_system})`}
            />
            <InformationPointBox header={ankeskjema.summary.sections.case.vedtak}>
                <Normaltekst>
                    {useDateToVedtakText(anke.vedtakDate, ankeskjema.summary.sections.case.no_date)}
                </Normaltekst>
            </InformationPointBox>
        </SpaceBetweenFlexListContainer>
    );
};

interface SaksnummerTextProps {
    anke: Anke;
}

const SaksnummerText = ({ anke }: SaksnummerTextProps) => {
    const { ankeskjema } = useTranslation();
    if (anke.ankeInternalSaksnummer) {
        return <Normaltekst>{anke.ankeInternalSaksnummer}</Normaltekst>;
    }
    return <Normaltekst>{ankeskjema.summary.sections.case.not_specified}</Normaltekst>;
};

interface SaksnummerProps {
    anke: Anke;
    header: string;
}

const Saksnummer = ({ anke, header }: SaksnummerProps) => (
    <InformationPointBox header={header}>
        <SaksnummerText anke={anke} />
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
