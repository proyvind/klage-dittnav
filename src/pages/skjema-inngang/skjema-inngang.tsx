import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';
import queryString from 'query-string';

const SkjemaInngang = (props: any) => {
    const query = queryString.parse(props.location.search);

    return (
        <Margin80TopContainer>
            <InngangInfoBox query={query} />
        </Margin80TopContainer>
    );
};

export default SkjemaInngang;
