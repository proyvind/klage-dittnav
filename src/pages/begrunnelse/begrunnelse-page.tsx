import React, { useEffect } from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';

const BegrunnelsePage = (props: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Begrunnelse
            chosenVedtak={props.chosenVedtak}
            ytelse={props.ytelse}
            next={() => props.next()}
            previous={() => props.previous()}
        />
    );
};

export default BegrunnelsePage;
