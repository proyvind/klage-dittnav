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

    const { activeKlage } = useSelector((state: Store) => state);

    let waitingJoark = true;

    setTimeout(() => {
        waitingJoark = false;
    }, 5000);

    const getJId = (klageId: number) => {
        getJournalpostId(klageId)
            .then(response => {
                if (response === '') {
                    if (waitingJoark) {
                        getJId(klageId);
                    } else {
                        setWaitingForJoark(false);
                    }
                } else {
                    console.log('response!');
                    setSuccess(true);
                    setWaitingForJoark(false);
                    waitingJoark = false;
                }
            })
            .catch(err => {
                console.log('error ', err);
            });
    };

    if (waitingForJoark && activeKlage.id) {
        getJId(activeKlage.id);
    }

    if (!activeKlage.id) {
        return <Redirect to="/" />;
    } else {
        if (waitingForJoark) {
            return <KvitteringLoading />;
        } else {
            return success ? <KvitteringJournalfort /> : <KvitteringIkkeJournalfort />;
        }
    }
};

export default KvitteringPage;
