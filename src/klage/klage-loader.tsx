import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { getKlage, updateKlage } from '../api/api';
import { CenteredContainer } from '../styled-components/common';
import { AppContext } from '../app-context/app-context';
import { Klage } from './klage';
import klageStore from './klage-store';

interface Props {
    render: (klage: Klage) => JSX.Element;
}

interface Match {
    klageId: string;
}

const KlageLoader = (props: Props) => {
    const { klage, setKlage } = useContext(AppContext);
    const { klageId } = useParams<Match>();
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState('Laster klage...');

    useEffect(() => {
        if (klage === null || klageId !== klage.id.toString()) {
            getKlage(klageId)
                .then(klage => {
                    setStatus('Gjenoppretter klage...');
                    const restoredKlage = klageStore.restore(klage);
                    if (restoredKlage !== klage) {
                        return updateKlage(restoredKlage).then(() => {
                            klageStore.clear();
                            return restoredKlage;
                        });
                    }
                    klageStore.clear();
                    return klage;
                })
                .then(setKlage)
                .catch((error: Error) => setError(formatError(klageId, error)));
        }
    }, [klageId, klage, setKlage]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
                <Normaltekst>{status}</Normaltekst>
            </CenteredContainer>
        );
    }

    return props.render(klage);
};

const formatError = (klageId: string, error: Error) => `Klarte ikke hente klage med ID "${klageId}". ${error.message}`;

export default KlageLoader;
