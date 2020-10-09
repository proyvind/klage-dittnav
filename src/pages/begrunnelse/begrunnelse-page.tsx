import React, { useEffect } from 'react';
import Begrunnelse from '../../components/begrunnelse/begrunnelse';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { logInfo } from '../../utils/logger/frontendLogger';
import { useLogPageView } from '../../utils/logger/use-log-page-view';

interface Props {
    next: () => void;
}

const BegrunnelsePage = (props: Props) => {
    useEffect(() => window.scrollTo(0, 0), []);
    useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

    logInfo('Begrunnelsepage entered.');

    return <Begrunnelse next={() => props.next()} />;
};

export default BegrunnelsePage;
