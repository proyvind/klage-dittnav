import React, { useEffect } from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';
import { Vedtak } from '../../types/vedtak';
import { logInfo } from '../../utils/logger/frontendLogger';

interface Props {
    ytelse: string;
    chosenVedtak?: Vedtak;
    next: () => void;
    previous: () => void;
}

const BegrunnelsePage = (props: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    logInfo('Begrunnelsepage entered.', { chosenYtelse: props.ytelse, referrer: document.referrer });

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
