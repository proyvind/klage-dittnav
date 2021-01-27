import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureStringIsTema, TemaKey } from '../tema/tema';
import { getQueryValue } from '../query/get-query-value';
import { createKlage, getDraftKlage, getFullmaktsgiver } from '../api/api';
import { AppContext } from '../app-context/app-context';
import { getTitle } from '../query/get-title';
import LoadingPage from '../loading-page/loading-page';
import { foedselsnrFormat } from './klageskjema/summary/text-formatting';
import { Language } from '../klage/klage';

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

        const fullmaktsgiver = getQueryValue(query.fullmaktsgiver);

        if (fullmaktsgiver === null) {
            resumeOrCreateKlage(temaKey, fullmaktsgiver, query)
                .then(setKlage)
                .catch(() => setError(oppretteKlageError()));
            return;
        }
        getFullmaktsgiver(temaKey, fullmaktsgiver)
            .then(setFullmaktsgiver)
            .then(() =>
                resumeOrCreateKlage(temaKey, fullmaktsgiver, query)
                    .then(setKlage)
                    .catch(() => setError(oppretteKlageError()))
            )
            .catch(() => setError(finneFullmaktsgiverError(fullmaktsgiver)));
    }, [search, klage, setKlage, history, setFullmaktsgiver]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>Oppretter klage...</LoadingPage>;
    }

    return <Redirect to={`/${klage.id}/begrunnelse`} />;
};

async function resumeOrCreateKlage(
    temaKey: TemaKey,
    fullmaktsgiver: string | null,
    query: queryString.ParsedQuery<string>
) {
    const title = getTitle(query, temaKey);
    const saksnummer = getQueryValue(query.saksnummer);
    const language = getLanguage(query);

    const draftKlage = await getDraftKlage(temaKey, title, saksnummer, fullmaktsgiver);
    if (draftKlage !== null) {
        return draftKlage;
    }
    return await createKlage({
        fritekst: '',
        checkboxesSelected: [],
        tema: temaKey,
        ytelse: title,
        vedtakDate: null,
        userSaksnummer: null,
        internalSaksnummer: saksnummer,
        fullmaktsgiver: fullmaktsgiver,
        language: language
    });
}

const finneFullmaktsgiverError = (fnr: string) =>
    `Klarte ikke finne fullmaktsgiver med personnummer ${foedselsnrFormat(fnr)}.`;
const oppretteKlageError = () => 'Klarte ikke opprette klage';

export function getLanguage(query: queryString.ParsedQuery): Language {
    const language = getQueryValue(query.language);
    if (language === null) {
        return Language.nb;
    }
    return language as Language;
}

export default CreateKlage;
