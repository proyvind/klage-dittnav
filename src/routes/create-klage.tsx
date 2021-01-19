import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureStringIsTema } from '../tema/tema';
import { getQueryValue } from '../query/get-query-value';
import { createKlage, getDraftKlage, getFullmaktsgiver } from '../api/api';
import { AppContext } from '../app-context/app-context';
import { getTitle } from '../query/get-title';
import LoadingPage from '../loading-page/loading-page';
import { foedselsnrFormat } from './klageskjema/summary/text-formatting';

const CreateKlage = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { klage, setKlage, setFullmaktsgiver } = useContext(AppContext);
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

        if (fullmaktsgiver) {
            getFullmaktsgiver(temaKey, fullmaktsgiver)
                .then(setFullmaktsgiver)
                .catch(() => {
                    setError(finneFullmaktsgiverError(fullmaktsgiver));
                });
        }

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
            .catch(() => setError(oppretteKlageError()));
    }, [search, klage, setKlage, history, setFullmaktsgiver]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>Oppretter klage...</LoadingPage>;
    }

    return <Redirect to={`/${klage.id}/begrunnelse`} />;
};

const finneFullmaktsgiverError = (fnr: string) =>
    `Klarte ikke finne fullmaktsgiver med personnummer ${foedselsnrFormat(fnr)}.`;
const oppretteKlageError = () => 'Klarte ikke opprette klage';

export default CreateKlage;
