import React from 'react';
import VedtakFormAutomatic from '../../components/vedtaket/vedtak-form-automatic';
import { getVedtak } from '../../services/klageService';
import VedtakFormManual from '../../components/vedtaket/vedtak-form-manual';
import { Vedtak } from '../../types/vedtak';
import NavFrontendSpinner from 'nav-frontend-spinner';

class VedtaketPage extends React.Component<
    {},
    { vedtak: Vedtak[]; isLoading: boolean; optToFillOutManually: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { vedtak: [], isLoading: true, optToFillOutManually: false };
    }

    componentDidMount() {
        this.getData();
    }

    showManualForm() {
        this.setState({ optToFillOutManually: true });
    }

    async getData() {
        const FOUND_VEDTAK = await getVedtak();
        // const FOUND_VEDTAK: Vedtak[] = [];
        this.setState({
            vedtak: FOUND_VEDTAK,
            isLoading: false
        });
    }

    render() {
        if (this.state.isLoading) return <NavFrontendSpinner type={'XL'} />;
        if (this.state.vedtak.length === 0 || this.state.optToFillOutManually) {
            return <VedtakFormManual />;
        }
        return <VedtakFormAutomatic FOUND_VEDTAK={this.state.vedtak} showManualForm={() => this.showManualForm()} />;
    }
}

export default VedtaketPage;
