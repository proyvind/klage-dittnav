import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { AppContext } from '../../app-context/app-context';
import LoadingPage from '../../loading-page/loading-page';
import { useTranslation } from '../../language/use-translation';
import { Anke, AnkeInternalSaksnummer } from './types/anke';
import { getAnke, updateAnke } from '../../api/anke/api';
import ankeStore from './anke-store';

interface Props {
    render: (anke: Anke) => JSX.Element;
}

interface Match {
    ankeInternalSaksnummer: AnkeInternalSaksnummer;
}

const AnkeLoader = (props: Props) => {
    const { anke, setAnke, setFullmaktsgiver } = useContext(AppContext);
    const { ankeInternalSaksnummer } = useParams<Match>();
    const { anke_loader } = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(anke_loader.loading_anke);

    useEffect(() => {
        if (anke === null || ankeInternalSaksnummer !== anke.ankeInternalSaksnummer) {
            getAnke(ankeInternalSaksnummer)
                .then(anke => {
                    setStatus(anke_loader.restoring);

                    const restoredAnke = ankeStore.restore(anke);
                    if (restoredAnke !== anke) {
                        return updateAnke(restoredAnke).then(() => {
                            ankeStore.clear();
                            return restoredAnke;
                        });
                    }
                    ankeStore.clear();

                    return anke;
                })
                .then(setAnke)
                .catch((error: Error) => setError(anke_loader.format_error(ankeInternalSaksnummer, error)));
        }
    }, [ankeInternalSaksnummer, anke, setAnke, setFullmaktsgiver, anke_loader]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (anke === null) {
        return <LoadingPage>{status}</LoadingPage>;
    }

    return props.render(anke);
};

export default AnkeLoader;
