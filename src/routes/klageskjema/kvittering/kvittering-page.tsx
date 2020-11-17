import React, { useState, useEffect } from 'react';
import Kvittering from './kvittering';
import KvitteringLoading from './kvitteringLoading';
import { getJournalpostId } from '../../../api/api';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { Klage } from '../../../klage/klage';

interface Props {
    klage: Klage;
}

const KvitteringPage = ({ klage }: Props) => {
    const [waitingForJoark, setWaitingForJoark] = useState<boolean>(klage.journalpostId === null);
    const [informStillWorking, setInformStillWorking] = useState<boolean>(false);
    const [journalPostId, setJournalPostId] = useState<string | null>(klage.journalpostId);

    useLogPageView(PageIdentifier.KLAGESKJEMA_KVITTERING);

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

        const waitForJournalpostId = (klageId: string | number) => {
            getJournalpostId(klageId).then(response => {
                if (response === '') {
                    if (waitingJoark) {
                        // Spør etter journalpost-ID hvert sekund
                        setTimeout(() => waitForJournalpostId(klageId), 1000);
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
            waitForJournalpostId(klage.id);
        }
    }, [waitingForJoark, journalPostId, klage]);

    if (journalPostId === null || klage.finalizedDate === null) {
        return <KvitteringLoading informStillWorking={informStillWorking} />;
    } else {
        return <Kvittering klageId={klage.id} journalPostId={journalPostId} finalizedDate={klage.finalizedDate} />;
    }
};

export default KvitteringPage;
