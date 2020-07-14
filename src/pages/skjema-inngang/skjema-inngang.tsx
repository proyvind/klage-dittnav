import React from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import NotFoundPage from '../not-found/not-found-page';
import { isValidYtelse } from '../../utils/routes.config';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';

const SkjemaInngang = (props: any) => {
    let ytelse = props.match.params.ytelse;
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
