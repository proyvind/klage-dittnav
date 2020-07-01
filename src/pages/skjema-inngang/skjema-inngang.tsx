import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import NotFoundPage from '../not-found/not-found-page';

const SkjemaInngang = (props: any) => {
    let ytelse = props.match.params.ytelse;
    if (ytelse === 'foreldrepenger' || ytelse === 'engangsstonad' || ytelse === 'svangerskapspenger') {
        return <InngangInfoBox ytelse={ytelse} />;
    }
    return <NotFoundPage />;
};

export default SkjemaInngang;
