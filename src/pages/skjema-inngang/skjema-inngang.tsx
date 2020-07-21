import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import NotFoundPage from '../not-found/not-found-page';
import {isValidYtelse} from '../../utils/routes.config';
import {Margin80TopContainer} from '../../styled-components/main-styled-components';
import {getYtelseFromSearch} from "../../utils/query-string";

const SkjemaInngang = (props: any) => {
    const ytelse = getYtelseFromSearch(props.location.search);
    if (isValidYtelse(ytelse)) {
        return (
            <Margin80TopContainer>
                <InngangInfoBox ytelse={ytelse} />
            </Margin80TopContainer>
        );
    }
    return <NotFoundPage />;
};

export default SkjemaInngang;
