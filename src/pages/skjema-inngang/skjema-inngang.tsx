import React, { useEffect } from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';
import queryString from 'query-string';
import { setReferrer } from '../../store/actions';
import { useDispatch } from 'react-redux';

const SkjemaInngang = (props: any) => {
    const dispatch = useDispatch();
    const query = queryString.parse(props.location.search);

    useEffect(() => {
        dispatch(setReferrer(document.referrer ?? ''));
    }, [dispatch]);

    return (
        <Margin80TopContainer>
            <InngangInfoBox query={query} />
        </Margin80TopContainer>
    );
};

export default SkjemaInngang;
