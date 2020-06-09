import React from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';

const BegrunnelsePage = (props: any) => (
    <Begrunnelse
        activeBegrunnelse={props.activeBegrunnelse}
        activeVedlegg={props.activeVedlegg}
        submitBegrunnelse={(activeBegrunnelse: string) => props.submitBegrunnelse(activeBegrunnelse)}
        submitVedlegg={(id: number, vedlegg: File[]) => props.submitVedlegg(id, vedlegg)}
    />
);

export default BegrunnelsePage;
