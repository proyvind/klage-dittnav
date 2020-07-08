import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import NotFoundPage from '../not-found/not-found-page';
import { isValidYtelse } from '../../utils/routes.config';

const SkjemaInngang = (props: any) => {
    let ytelse = props.match.params.ytelse;
    if (isValidYtelse(ytelse)) {
        return <InngangInfoBox ytelse={ytelse} />;
    }
    return <NotFoundPage />;
};

export default SkjemaInngang;
