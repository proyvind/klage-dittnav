import React, { useEffect } from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';
import { logInfo } from '../../utils/logger/frontendLogger';

interface Props {
    next: () => void;
}

const BegrunnelsePage = (props: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    logInfo('Begrunnelsepage entered.');

    return <Begrunnelse next={() => props.next()} />;
};

export default BegrunnelsePage;
