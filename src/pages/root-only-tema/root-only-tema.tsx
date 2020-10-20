import React from 'react';
import { Redirect, useLocation } from 'react-router';
import queryString from 'query-string';
import { ensureStringIsTema } from '../../types/tema';
import KlageEllerAnkeTema from '../../components/klage-eller-anke/klage-eller-anke-tema';

const TemaFromQueryOrFrontpage = () => {
    const location = useLocation();
    const temaKey = getTemaKey(location.search);
    if (temaKey === null) {
        return <KlageEllerAnkeTema />;
    }
    return <Redirect to={`/${temaKey}`} />;
};

export function getTemaKey(search: string) {
    const { tema } = queryString.parse(search);
    if (typeof tema === 'string' && tema.length !== 0) {
        return ensureStringIsTema(tema);
    }
    return null;
}

export default TemaFromQueryOrFrontpage;
