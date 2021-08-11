import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { getAllAvailableAnkerForUser } from '../../api/anke/api';
import { AppContext } from '../../app-context/app-context';
import { useTranslation } from '../../language/use-translation';
import { SectionTitle } from '../../styled-components/section-title';
import { WhiteSection } from '../../styled-components/white-section';
import { getUser } from '../../user/get-user';
import { Ankemulighet } from './ankemulighet';

interface Props {
    show: boolean;
}

export const DineAnkemuligheter = ({ show }: Props) => {
    const { inngang } = useTranslation();
    const { user, setUser } = useContext(AppContext);
    const { allAvailableAnkerForUser, setAllAvailableAnkerForUser } = useContext(AppContext);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const ankemuligheterTitle = inngang.skjemaHistorikk.ankemuligheterTitle;

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

        const anker = await getAllAvailableAnkerForUser().then(anker => {
            console.debug('DineAnkemuligheter: Anker loaded.', anker);
            if (!Array.isArray(anker)) {
                console.error('Anker is not an array.', anker);
                return [];
            }
            return anker;
        });
        setAllAvailableAnkerForUser(anker);
        setLoaded(true);
        setLoading(false);
    }, [user, setUser, setLoaded, setLoading, setAllAvailableAnkerForUser]);

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
        <WhiteSection>
            <SectionTitle>{ankemuligheterTitle}</SectionTitle>

            <AlertStripeInfo>
                Digital anke er foreløpig kun tilgjengelig for noen få ytelser. Om du ikke finner klagen du vil anke på
                her kan du anke via post. Se skjema lenger ned på siden.
            </AlertStripeInfo>

            <List>
                {allAvailableAnkerForUser.map(anke => (
                    <Ankemulighet ankemulighet={anke} key={anke.ankeInternalSaksnummer} />
                ))}
            </List>
        </WhiteSection>
    );
};

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 28px;
`;
