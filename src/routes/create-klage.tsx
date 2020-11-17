import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredContainer } from '../styled-components/common';
import { ensureStringIsTema } from '../tema/tema';
import { getQueryValue } from '../query/get-query-value';
import { createKlage } from '../api/api';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppContext } from '../app-context/app-context';
import { getTitle } from '../query/get-title';
import { NewKlage } from '../klage/klage';

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
        const newKlage: NewKlage = {
            fritekst: '',
            tema: temaKey,
            ytelse: title,
            vedtakDate: null,
            vedtakType: null,
            saksnummer
        };

        createKlage(newKlage)
            .then(setKlage)
            .catch(() => setError(formatError(newKlage)));
    }, [search, klage, setKlage, history]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
                <Normaltekst>Oppretter klage...</Normaltekst>
            </CenteredContainer>
        );
    }

    return <Redirect to={`/${klage.id}/begrunnelse`} />;
};

function formatError({ tema, ytelse, saksnummer }: NewKlage): string {
    let error = `Klarte ikke opprette klage med tema "${tema}"`;
    if (saksnummer === null) {
        error += ` og tittel "${ytelse}".`;
    } else {
        error += `, tittel "${ytelse}" og saksnummer "${saksnummer}".`;
    }

    return error;
}

export default CreateKlage;
