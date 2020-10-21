import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ensureStringIsTema } from '../../types/tema';
import InngangHovedkategorier from '../../components/inngang/inngang-hovedkategorier';

const RootWithQuery = () => {
    const { search } = useLocation();
    const query = queryString.parse(search);
    const temaKey = ensureStringIsTema(getQueryValue(query.tema));
    if (temaKey === null) {
        return <InngangHovedkategorier />;
    }
    const saksnummer = getQueryValue(query.saksnummer);
    if (saksnummer === null) {
        return <Redirect to={`/${temaKey}`} />;
    }
    return <Redirect to={`/${temaKey}?saksnummer=${saksnummer}`} />;
};

function getQueryValue(queryValue: string | string[] | null | undefined) {
    if (typeof queryValue === 'string' && queryValue.length !== 0) {
        return queryValue;
    }
    return null;
}

export default RootWithQuery;
