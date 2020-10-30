import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ensureStringIsTema } from '../../types/tema';
import InngangHovedkategorier from '../../components/inngang/inngang-hovedkategorier';
import LandingPage from '../landing-page/landing-page';

const RootWithQuery = () => {
    const { search } = useLocation();

    const query = queryString.parse(search);
    const temaKey = ensureStringIsTema(getQueryValue(query.tema));
    if (temaKey === null) {
        return <InngangHovedkategorier />;
    }

    const saksnummer = getQueryValue(query.saksnummer);
    return LandingPage(temaKey, saksnummer);
};

function getQueryValue(queryValue: string | string[] | null | undefined) {
    if (typeof queryValue === 'string' && queryValue.length !== 0) {
        return queryValue;
    }
    return null;
}

export default RootWithQuery;
