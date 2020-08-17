import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import NotFoundPage from '../not-found/not-found-page';
import { isValidYtelse } from '../../utils/routes.config';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';
import queryString from 'query-string';
import { defaultYtelse } from '../../types/ytelse';

const SkjemaInngang = (props: any) => {
    const query = queryString.parse(props.location.search);
    const ytelse = query.ytelse ?? defaultYtelse;

    if (ytelse && !Array.isArray(ytelse) && isValidYtelse(ytelse)) {
        return (
            <Margin80TopContainer>
                <InngangInfoBox ytelse={ytelse} />
            </Margin80TopContainer>
        );
    }
    return <NotFoundPage />;
};

export default SkjemaInngang;
