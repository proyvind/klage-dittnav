import React, { useState, useEffect } from 'react';
import Kvittering from '../../components/kvittering/kvittering';
import KvitteringLoading from '../../components/kvittering/kvitteringLoading';
import { getJournalpostId } from '../../services/base-service';
import { Klage } from '../../types/klage';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { useLogPageView } from '../../utils/logger/use-log-page-view';

interface Props {
    klage: Klage;
}

const KvitteringPage = ({ klage }: Props) => {
    const klageJournalpostId = klage?.journalpostId ?? null;

    const [waitingForJoark, setWaitingForJoark] = useState<boolean>(klageJournalpostId === null);
    const [informStillWorking, setInformStillWorking] = useState<boolean>(false);
    const [journalPostId, setJournalPostId] = useState<string | null>(klageJournalpostId);

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
