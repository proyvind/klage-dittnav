import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getAllAvailableAnkerForUser } from '../../api/anke/api';
import { AppContext } from '../../app-context/app-context';
import { TemaKey } from '../../tema/tema';
import { Row } from '../../styled-components/row';
import { TemaKey } from '../../tema/tema';
import { getUser } from '../../user/get-user';
import { AnkeDigitaltKnapp } from '../inngang/klage-anke-knapper/anke-digitalt-knapp';

interface Props {
    show: boolean;
    temaKey?: TemaKey;
}

export const DineAnkemuligheter = ({ show, temaKey }: Props) => {
    const { user, setUser } = useContext(AppContext);
    const { allAvailableAnkerForUser, setAllAvailableAnkerForUser } = useContext(AppContext);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);

        if (user === null) {
            try {
                setUser(await getUser());
            } catch {
                setAllAvailableAnkerForUser([]);
                return;
            }
        }

        const anker = await getAllAvailableAnkerForUser(temaKey).then(anker => {
            if (!Array.isArray(anker)) {
                console.error('Anker is not an array.', anker);
                return [];
            }
            return anker;
        });
        setAllAvailableAnkerForUser(anker);
        setLoaded(true);
        setLoading(false);
    }, [user, setUser, setLoaded, setLoading, setAllAvailableAnkerForUser, temaKey]);

    useEffect(() => {
        if (!show) {
            console.debug('DineAnkemuligheter hidden.');
            return;
        }

        if (loaded || loading) {
            return;
        }

        load();
    }, [show, loaded, loading, load]);

    if (!show || allAvailableAnkerForUser.length === 0) {
        return null;
    }
    return (
        <Row>
            {allAvailableAnkerForUser.map(anke => (
                <Row key={anke.ankeInternalSaksnummer}>
                    <AnkeDigitaltKnapp ankemulighet={anke} />
                </Row>
            ))}
        </Row>
    );
};
