import React from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';

const BegrunnelsePage = (props: any) => (
    <Begrunnelse
        activeBegrunnelse={props.activeBegrunnelse}
        activeVedlegg={props.activeVedlegg}
        activeVedtak={props.activeVedtak}
        submitBegrunnelse={(activeBegrunnelse: string) => props.submitBegrunnelse(activeBegrunnelse)}
        next={() => props.next()}
    />
);

export default BegrunnelsePage;
