import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';

const SkjemaInngang = (props: any) => {
    let ytelse = props.match.params.ytelse;
    if (ytelse === 'foreldrepenger' || ytelse === 'engangsstonad' || ytelse === 'svangerskapspenger') {
        return <InngangInfoBox ytelse={ytelse} />;
    }
};

export default SkjemaInngang;
