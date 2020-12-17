import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { CheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';
import { Reason } from '../../../klage/klage';

interface Props {
    checkedReasons: Reason[];
    setCheckedReasons: (reasons: Reason[]) => void;
    className?: string;
}

const Reasons = ({ checkedReasons, setCheckedReasons, className }: Props) => (
    <CheckboksPanelGruppe
        legend={'Hva er du uenig i? (valgfri)'}
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

const useCheckboxes = (checked: Reason[]) =>
    useMemo<CheckboksPanelProps[]>(
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
        [checked]
    );

export const reasonTexts: { [key in Reason]: string } = {
    [Reason.AVSLAG_PAA_SOKNAD]: 'Jeg har fått avslag på søknaden min',
    [Reason.FOR_LITE_UTBETALT]: 'Jeg har fått for lite utbetalt',
    [Reason.UENIG_I_NOE_ANNET]: 'Jeg er uenig i noe annet i vedtaket mitt',
    [Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]: 'Jeg er uenig i vedtaket om tilbakebetaling'
};

export default styled(Reasons)`
    && {
        margin-bottom: 32px;
    }
`;
