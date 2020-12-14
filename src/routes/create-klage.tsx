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
import { TITLES } from '../language/titles';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { Languages } from '../language/language';

const CreateKlage = () => {
    const { search } = useLocation();
    const lang = useLanguage();
    const { create } = useTranslation();
    const history = useHistory();
    const { klage, setKlage, setFullmaktsgiver } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);

    useEffect(() => {
        const query = queryString.parse(search);

        const temaKey = ensureStringIsTema(getQueryValue(query.tema));
        if (temaKey === null) {
            setError(create.invalid_tema(query.tema?.toString()));
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
            resumeOrCreateKlage(lang, temaKey, titleKey, ytelse, saksnummer, fullmaktsgiver)
                .then(k => {
                    setKlage(k);
                    setReadyToRedirect(true);
                })
                .catch(() => setError(create.create_error));
            return;
        }

        getFullmaktsgiver(temaKey, fullmaktsgiver)
            .then(setFullmaktsgiver)
            .then(() =>
                resumeOrCreateKlage(lang, temaKey, titleKey, ytelse, saksnummer, fullmaktsgiver)
                    .then(k => {
                        setKlage(k);
                        setReadyToRedirect(true);
                    })
                    .catch(() => setError(create.create_error))
            )
            .catch(() => setError(create.finne_fullmaktsgiver_error(foedselsnrFormat(fullmaktsgiver))));
    }, [search, klage, setKlage, create, lang, history, setFullmaktsgiver]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>{create.creating}</LoadingPage>;
    }

    if (readyToRedirect) {
        return <Redirect to={`/${lang}/${klage.id}/begrunnelse`} />;
    }
    return null;
};

async function resumeOrCreateKlage(
    language: Languages,
    temaKey: TemaKey,
    titleKey: string | null,
    ytelse: string | null,
    saksnummer: string | null,
    fullmaktsgiver: string | null
) {
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
        fullmaktsgiver,
        language
    });
}

export default CreateKlage;
