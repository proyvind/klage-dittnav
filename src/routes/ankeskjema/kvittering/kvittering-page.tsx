import React, { useState, useEffect } from 'react';
import Kvittering from './kvittering';
import KvitteringLoading from './kvittering-loading';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { Anke, AnkeInternalSaksnummer } from '../../../store/anke/types/anke';
import { getJournalpostId } from '../../../api/anke/api';

interface Props {
    anke: Anke;
}

const KvitteringPage = ({ anke }: Props) => {
    const [waitingForJoark, setWaitingForJoark] = useState<boolean>(anke.journalpostId === null);
    const [informStillWorking, setInformStillWorking] = useState<boolean>(false);
    const [journalPostId, setJournalPostId] = useState<string | null>(anke.journalpostId);

    useLogPageView(PageIdentifier.ANKESKJEMA_KVITTERING);

    useEffect(() => {
        if (journalPostId !== null) {
            return;
        }

        let waitingJoark = true;

        // Melding om at den fortsatt jobber etter 8 sek
        setTimeout(() => setInformStillWorking(true), 8000);

        // Gi opp med å vente på journalpost-ID etter 15 sek
        setTimeout(() => {
            waitingJoark = false;
        }, 15000);

        const waitForJournalpostId = (ankeInternalSaksnummer: AnkeInternalSaksnummer) => {
            getJournalpostId(ankeInternalSaksnummer).then(response => {
                if (response === '') {
                    if (waitingJoark) {
                        // Spør etter journalpost-ID hvert sekund
                        setTimeout(() => waitForJournalpostId(ankeInternalSaksnummer), 1000);
                    } else {
                        setWaitingForJoark(false);
                    }
                } else {
                    setWaitingForJoark(false);
                    setJournalPostId(response);
                    waitingJoark = false;
                }
            });
        };

        if (waitingForJoark) {
            waitForJournalpostId(anke.ankeInternalSaksnummer);
        }
    }, [waitingForJoark, journalPostId, anke]);

    if (journalPostId === null || anke.finalizedDate === null) {
        return <KvitteringLoading informStillWorking={informStillWorking} />;
    } else {
        return <Kvittering ankeInternalSaksnummer={anke.ankeInternalSaksnummer} finalizedDate={anke.finalizedDate} />;
    }
};

export default KvitteringPage;
