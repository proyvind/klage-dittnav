import React, { useState } from 'react';
import VedtakFormAutomatic from '../../components/vedtaket/vedtak-form-automatic';
import VedtakFormManual from '../../components/vedtaket/vedtak-form-manual';
import { Vedtak } from '../../types/vedtak';

const VedtaketPage = (props: any) => {
    const [optToFillOutManually, setOptToFillOutManually] = useState<boolean>(false);
    const showManualForm = () => {
        setOptToFillOutManually(true);
    };

    if (props.foundVedtak?.length === 0 || optToFillOutManually) {
        return <VedtakFormManual submitVedtak={(activeVedtak: Vedtak) => props.submitVedtak(activeVedtak)} />;
    }

    return (
        <VedtakFormAutomatic
            foundVedtak={props.foundVedtak}
            showManualForm={() => showManualForm()}
            activeVedtak={props.activeVedtak}
            submitVedtak={(activeVedtak: Vedtak) => props.submitVedtak(activeVedtak)}
        />
    );
};

export default VedtaketPage;
