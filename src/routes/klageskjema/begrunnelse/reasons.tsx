import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';
import { Reason } from '../../../klage/klage';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    title: string;
    checkedReasons: Reason[];
    setCheckedReasons: (reasons: Reason[]) => void;
    className?: string;
}

const Reasons = ({ title, checkedReasons, setCheckedReasons, className }: Props) => (
    <CheckboksPanelGruppe
        legend={title}
        className={className}
        checkboxes={useCheckboxes(checkedReasons)}
        onChange={(_, clickedReason: Reason) => {
            if (checkedReasons.includes(clickedReason)) {
                setCheckedReasons(checkedReasons.filter(reason => reason !== clickedReason));
            } else {
                setCheckedReasons(checkedReasons.concat(clickedReason));
            }
        }}
    />
);

const useCheckboxes = (checked: Reason[]) => {
    const { klageskjema } = useTranslation();
    const reasonTexts = klageskjema.begrunnelse.reasons.texts;
    return useMemo<CheckboksPanelProps[]>(
        () => [
            {
                label: reasonTexts[Reason.AVSLAG_PAA_SOKNAD],
                value: Reason.AVSLAG_PAA_SOKNAD,
                id: Reason.AVSLAG_PAA_SOKNAD,
                checked: checked.includes(Reason.AVSLAG_PAA_SOKNAD)
            },
            {
                label: reasonTexts[Reason.FOR_LITE_UTBETALT],
                value: Reason.FOR_LITE_UTBETALT,
                id: Reason.FOR_LITE_UTBETALT,
                checked: checked.includes(Reason.FOR_LITE_UTBETALT)
            },
            {
                label: reasonTexts[Reason.UENIG_I_NOE_ANNET],
                value: Reason.UENIG_I_NOE_ANNET,
                id: Reason.UENIG_I_NOE_ANNET,
                checked: checked.includes(Reason.UENIG_I_NOE_ANNET)
            },
            {
                label: reasonTexts[Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING],
                value: Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING,
                id: Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING,
                checked: checked.includes(Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING)
            }
        ],
        [checked, reasonTexts]
    );
};

export default styled(Reasons)`
    && {
        margin-bottom: 32px;
    }
`;
