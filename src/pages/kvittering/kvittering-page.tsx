import React, { useState, useEffect } from 'react';
import Kvittering from '../../components/kvittering/kvittering';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';
import KvitteringLoading from '../../components/kvittering/kvitteringLoading';
import { getJournalpostId, FinalizedKlage } from '../../services/klageService';
import { StaticContext } from 'react-router';
import { Redirect, RouteComponentProps } from 'react-router-dom';

const KvitteringPage = (props: RouteComponentProps<{}, StaticContext, FinalizedKlage>) => {
    const [waitingForJoark, setWaitingForJoark] = useState<boolean>(true);
    const [informStillWorking, setInformStillWorking] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [journalPostId, setJournalPostId] = useState<string>('');

    const { activeKlage } = useSelector((state: Store) => state);

    useEffect(() => {
        let waitingJoark = true;

        // Melding om at den fortsatt jobber etter 8 sek
        setTimeout(() => {
            setInformStillWorking(true);
        }, 8000);

        // Gi opp med å vente på journalpost-ID etter 15 sek
        setTimeout(() => {
            waitingJoark = false;
        }, 15000);

        const waitForJournalpostId = (klageId: number) => {
            getJournalpostId(klageId)
                .then(response => {
                    if (response === '') {
                        if (waitingJoark) {
                            // Spør etter journalpost-ID hvert sekund
                            setTimeout(() => waitForJournalpostId(klageId), 1000);
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
    }, [waitingForJoark, activeKlage.id]);

    if (!activeKlage.id) {
        return <Redirect to="/" />;
    } else {
        if (waitingForJoark) {
            return <KvitteringLoading informStillWorking={informStillWorking} />;
        } else {
            return (
                <Kvittering
                    klageId={activeKlage.id}
                    journalPostId={journalPostId}
                    finalizedDate={props.location.state.finalizedDate}
                    success={success}
                />
            );
        }
    }
};

export default KvitteringPage;
