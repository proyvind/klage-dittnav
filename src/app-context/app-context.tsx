import React, { useState } from 'react';
import { Anke, AvailableAnke } from '../store/anke/types/anke';
import { Klage } from '../store/klage/types/klage';
import { User } from '../user/user';

export interface AppContextType {
    user: User | null;
    klage: Klage | null;
    anke: Anke | null;
    fullmaktsgiver: User | null;
    allAvailableAnkerForUser: AvailableAnke[];
    setKlage: (klage: Klage | null) => void;
    setAnke: (anke: Anke | null) => void;
    setUser: (user: User | null) => void;
    setFullmaktsgiver: (fullmaktsgiver: User | null) => void;
    setAllAvailableAnkerForUser: (anker: AvailableAnke[]) => void;
}

export const AppContext = React.createContext<AppContextType>({
    user: null,
    klage: null,
    anke: null,
    fullmaktsgiver: null,
    allAvailableAnkerForUser: [],
    setKlage: () => {},
    setAnke: () => {},
    setUser: () => {},
    setFullmaktsgiver: () => {},
    setAllAvailableAnkerForUser: () => {}
});

interface Props {
    children: JSX.Element;
}

const AppContextComponenet = (props: Props) => {
    const [klage, setKlage] = useState<Klage | null>(null);
    const [anke, setAnke] = useState<Anke | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [fullmaktsgiver, setFullmaktsgiver] = useState<User | null>(null);
    const [allAvailableAnkerForUser, setAllAvailableAnkerForUser] = useState<AvailableAnke[]>([]);
    const state: AppContextType = {
        klage,
        anke,
        user,
        fullmaktsgiver,
        allAvailableAnkerForUser,
        setKlage,
        setAnke,
        setUser,
        setFullmaktsgiver,
        setAllAvailableAnkerForUser
    };
    return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
};

export default AppContextComponenet;
