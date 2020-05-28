import React from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';

const BegrunnelsePage = (props: any) => (
    <Begrunnelse submitBegrunnelse={(activeBegrunnelse: string) => props.submitBegrunnelse(activeBegrunnelse)} />
);

export default BegrunnelsePage;
