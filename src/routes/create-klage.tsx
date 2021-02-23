import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureStringIsTema, TemaKey } from '../tema/tema';
import { getQueryValue } from '../query/get-query-value';
import { createKlage, getDraftKlage, getFullmaktsgiver } from '../api/api';
import { AppContext } from '../app-context/app-context';
import LoadingPage from '../loading-page/loading-page';
import { foedselsnrFormat } from './klageskjema/summary/text-formatting';
import { Language } from '../klage/klage';
import { TITLES } from '../language/titles';

const CreateKlage = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { klage, setKlage, setFullmaktsgiver } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);

    useEffect(() => {
        const query = queryString.parse(search);

        const temaKey = ensureStringIsTema(getQueryValue(query.tema));
        if (temaKey === null) {
            setError(`Ugyldig tema "${query.tema}".`);
            return;
        }

        const ytelse = getQueryValue(query.ytelse);
        const titleKey = TITLES.ensureTitleKey(getQueryValue(query.tittel));
        const saksnummer = getQueryValue(query.saksnummer);
        const fullmaktsgiver = getQueryValue(query.fullmaktsgiver);

        if (
            klage !== null &&
            klage.tema === temaKey &&
            klage.titleKey === (titleKey ?? undefined) &&
            klage.internalSaksnummer === saksnummer &&
            klage.ytelse === (ytelse ?? undefined) &&
            klage.fullmaktsgiver === fullmaktsgiver
        ) {
            return;
        }

        if (fullmaktsgiver === null) {
            resumeOrCreateKlage(temaKey, titleKey, ytelse, saksnummer, fullmaktsgiver)
                .then(k => {
                    setKlage(k);
                    setReadyToRedirect(true);
                })
                .catch(() => setError(oppretteKlageError()));
            return;
        }

        getFullmaktsgiver(temaKey, fullmaktsgiver)
            .then(setFullmaktsgiver)
            .then(() =>
                resumeOrCreateKlage(temaKey, titleKey, ytelse, saksnummer, fullmaktsgiver)
                    .then(k => {
                        setKlage(k);
                        setReadyToRedirect(true);
                    })
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

    if (readyToRedirect) {
        return <Redirect to={`/${klage.id}/begrunnelse`} />;
    }
    return null;
};

async function resumeOrCreateKlage(
    temaKey: TemaKey,
    titleKey: string | null,
    ytelse: string | null,
    saksnummer: string | null,
    fullmaktsgiver: string | null
) {
    const language = getLanguage();

    const draftKlage = await getDraftKlage(temaKey, titleKey, ytelse, saksnummer, fullmaktsgiver);
    if (draftKlage !== null) {
        return draftKlage;
    }
    return await createKlage({
        fritekst: '',
        checkboxesSelected: [],
        tema: temaKey,
        titleKey: titleKey ?? undefined,
        ytelse: ytelse ?? undefined,
        vedtakDate: null,
        userSaksnummer: null,
        internalSaksnummer: saksnummer,
        fullmaktsgiver: fullmaktsgiver,
        language
    });
}

const finneFullmaktsgiverError = (fnr: string) =>
    `Klarte ikke finne fullmaktsgiver med personnummer ${foedselsnrFormat(fnr)}.`;
const oppretteKlageError = () => 'Klarte ikke opprette klage';

export function getLanguage(): Language {
    return Language.nb;
}

export default CreateKlage;
