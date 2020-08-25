import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';
import queryString from 'query-string';
import { Tema } from '../../types/tema';

const SkjemaInngang = (props: any) => {
    const query = queryString.parse(props.location.search);
    let ytelse;

    if (query.ytelse) {
        ytelse = query.ytelse;
    } else {
        if (query.tema && !Array.isArray(query.tema)) {
            ytelse = Tema[query.tema] ?? Tema['UKJ'];
        }
    }

    return (
        <Margin80TopContainer>
            <InngangInfoBox ytelse={ytelse} />
        </Margin80TopContainer>
    );
};

export default SkjemaInngang;
