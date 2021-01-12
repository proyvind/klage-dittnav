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
        const fullmaktsgiver = getQueryValue(query.fullmaktsgiver);

        getDraftKlage(temaKey, title, saksnummer, fullmaktsgiver)
            .catch(() =>
                createKlage({
                    fritekst: '',
                    checkboxesSelected: [],
                    tema: temaKey,
                    ytelse: title,
                    vedtakDate: null,
                    userSaksnummer: null,
                    internalSaksnummer: saksnummer,
                    fullmaktsgiver: fullmaktsgiver
                })
            )
            .then(setKlage)
            .catch(() => setError(formatError(temaKey, title, saksnummer, fullmaktsgiver)));
    }, [search, klage, setKlage, history]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>Oppretter klage...</LoadingPage>;
    }

    return <Redirect to={`/${klage.id}/begrunnelse`} />;
};

function formatError(
    tema: TemaKey,
    ytelse: string,
    internalSaksnummer: string | null,
    fullmaktsgiver: string | null
): string {
    let error = `Klarte ikke opprette klage med tema "${tema}"`;
    if (internalSaksnummer === null) {
        if (fullmaktsgiver === null) {
            error += ` og tittel "${ytelse}".`;
        } else {
            error += `, tittel "${ytelse}" og fullmaktsgiver "${fullmaktsgiver}".`;
        }
    } else {
        if (fullmaktsgiver === null) {
            error += `, tittel "${ytelse}" og saksnummer "${internalSaksnummer}".`;
        } else {
            error += `, tittel "${ytelse}", saksnummer "${internalSaksnummer}" og fullmaktsgiver "${fullmaktsgiver}".`;
        }
    }

    return error;
}

export default CreateKlage;
