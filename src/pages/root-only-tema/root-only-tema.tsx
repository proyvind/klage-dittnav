import React from 'react';
import { Redirect, useLocation } from 'react-router';
import queryString from 'query-string';
import { ensureStringIsTema, TemaKey } from '../../types/tema';

const RootOnlyTema = () => {
    const location = useLocation();
    const temaKey = getTemaKey(location.search);
    const redirectPath = getRedirectPath(temaKey);
    return <Redirect to={redirectPath} />;
};

export function getRedirectPath(temaKey: TemaKey | null) {
    if (temaKey === null) {
        return '/klage-anke';
    }

    return `/klage-anke/${temaKey}`;
}

export function getTemaKey(search: string) {
    const { tema } = queryString.parse(search);
    if (typeof tema === 'string' && tema.length !== 0) {
        return ensureStringIsTema(tema);
    }
    return null;
}

export default RootOnlyTema;
