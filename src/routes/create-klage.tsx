import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureStringIsTema, TemaKey } from '../tema/tema';
import { getQueryValue } from '../query/get-query-value';
import { createKlage, getDraftKlage } from '../api/api';
import { AppContext } from '../app-context/app-context';
import { getTitle } from '../query/get-title';
import LoadingPage from '../loading-page/loading-page';

const CreateKlage = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { klage, setKlage } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (klage !== null) {
            return;
        }

        const query = queryString.parse(search);
        const temaKey = ensureStringIsTema(getQueryValue(query.tema));

        if (temaKey === null) {
            setError(`Ugyldig tema "${query.tema}".`);
            return;
        }

        const title = getTitle(query, temaKey);
        const saksnummer = getQueryValue(query.saksnummer);

        getDraftKlage(temaKey, title, saksnummer)
            .catch(() =>
                createKlage({
                    fritekst: '',
                    checkboxesSelected: [],
                    tema: temaKey,
                    ytelse: title,
                    vedtakDate: null,
                    userSaksnummer: null,
                    internalSaksnummer: saksnummer
                })
            )
            .then(setKlage)
            .catch(() => setError(formatError(temaKey, title, saksnummer)));
    }, [search, klage, setKlage, history]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>Oppretter klage...</LoadingPage>;
    }

    return <Redirect to={`/${klage.id}/begrunnelse`} />;
};

function formatError(tema: TemaKey, ytelse: string, internalSaksnummer: string | null): string {
    let error = `Klarte ikke opprette klage med tema "${tema}"`;
    if (internalSaksnummer === null) {
        error += ` og tittel "${ytelse}".`;
    } else {
        error += `, tittel "${ytelse}" og saksnummer "${internalSaksnummer}".`;
    }

    return error;
}

export default CreateKlage;
