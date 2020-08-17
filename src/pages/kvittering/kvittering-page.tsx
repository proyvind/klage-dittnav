import React, { useState } from 'react';
import KvitteringJournalfort from '../../components/kvittering/kvitteringJournalfort';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';
import KvitteringLoading from '../../components/kvittering/kvitteringLoading';
import { getJournalpostId } from '../../services/klageService';
import KvitteringIkkeJournalfort from '../../components/kvittering/kvitteringIkkeJournalfort';
import { Redirect } from 'react-router-dom';

const KvitteringPage = () => {
    const [waitingForJoark, setWaitingForJoark] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [journalPostId, setJournalPostId] = useState<string>('');

    const { activeKlage } = useSelector((state: Store) => state);

    let waitingJoark = true;

    // Gi opp med å vente på journalpost-ID etter 5 sek
    setTimeout(() => {
        waitingJoark = false;
    }, 5000);

    const waitForJournalpostId = (klageId: number) => {
        getJournalpostId(klageId)
            .then(response => {
                if (response === '') {
                    if (waitingJoark) {
                        // Spør etter journalpost-ID hvert halve sekund
                        setTimeout(waitForJournalpostId(klageId), 500);
                    } else {
                        setWaitingForJoark(false);
                    }
                } else {
                    setSuccess(true);
                    setWaitingForJoark(false);
                    setJournalPostId(response);
                    waitingJoark = false;
                }
            })
            .catch(err => {
                console.log('error ', err);
            });
    };

    if (waitingForJoark && activeKlage.id) {
        waitForJournalpostId(activeKlage.id);
    }

    if (!activeKlage.id) {
        return <Redirect to="/" />;
    } else {
        if (waitingForJoark) {
            return <KvitteringLoading />;
        } else {
            return success ? <KvitteringJournalfort journalPostId={journalPostId} /> : <KvitteringIkkeJournalfort />;
        }
    }
};

export default KvitteringPage;
