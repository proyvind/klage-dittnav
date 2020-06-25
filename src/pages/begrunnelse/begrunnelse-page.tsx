import React from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';

const BegrunnelsePage = (props: any) => (
    <Begrunnelse
        chosenVedtak={props.chosenVedtak}
        ytelse={props.ytelse}
        next={() => props.next()}
        previous={() => props.previous()}
    />
);

export default BegrunnelsePage;
