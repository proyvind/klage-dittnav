import React from 'react';
import VedtakFormAutomatic from '../../components/vedtaket/vedtak-form-automatic';
import VedtakFormManual from '../../components/vedtaket/vedtak-form-manual';
import { Vedtak } from '../../types/vedtak';

const VedtaketPage = (props: any) => {
    const showManualForm = () => {
        props.setOptToFillOutManually(true);
    };

    if (props.availableVedtak?.length === 0 || props.optToFillOutManually) {
        return (
            <VedtakFormManual
                activeVedtak={props.activeVedtak}
                submitVedtak={(activeVedtak: Vedtak) => props.submitVedtak(activeVedtak)}
            />
        );
    } else {
        return (
            <VedtakFormAutomatic
                availableVedtak={props.availableVedtak}
                showManualForm={() => showManualForm()}
                activeVedtak={props.activeVedtak}
                submitVedtak={(activeVedtak: Vedtak) => props.submitVedtak(activeVedtak)}
            />
        );
    }
};

export default VedtaketPage;
