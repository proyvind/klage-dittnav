import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { getFullmaktsgiver, getKlage, updateKlage } from '../api/api';
import { AppContext } from '../app-context/app-context';
import { Klage } from './klage';
import klageStore from './klage-store';
import LoadingPage from '../loading-page/loading-page';
import { useTranslation } from '../language/use-translation';

interface Props {
    render: (klage: Klage) => JSX.Element;
}

interface Match {
    klageId: string;
}

const KlageLoader = (props: Props) => {
    const { klage, setKlage, setFullmaktsgiver } = useContext(AppContext);
    const { klageId } = useParams<Match>();
    const { klage_loader } = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(klage_loader.loading_klage);

    useEffect(() => {
        if (klage === null || klageId !== klage.id.toString()) {
            getKlage(klageId)
                .then(klage => {
                    setStatus(klage_loader.restoring);

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
                .then(klage => {
                    if (klage.fullmaktsgiver) {
                        getFullmaktsgiver(klage.tema, klage.fullmaktsgiver).then(setFullmaktsgiver);
                    }
                    return klage;
                })
                .then(setKlage)
                .catch((error: Error) => setError(klage_loader.format_error(klageId, error)));
        }
    }, [klageId, klage, setKlage, setFullmaktsgiver, klage_loader]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (klage === null) {
        return <LoadingPage>{status}</LoadingPage>;
    }

    return props.render(klage);
};

export default KlageLoader;
