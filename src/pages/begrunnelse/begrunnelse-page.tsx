import React, { useEffect } from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';
import { logInfo } from '../../utils/logger/frontendLogger';

const BegrunnelsePage = (props: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    logInfo('Begurnnelsepage entered.', { chosenYtelse: props.ytelse, referrer: document.referrer });

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
