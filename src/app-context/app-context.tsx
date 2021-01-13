import React, { useState } from 'react';
import { Klage } from '../klage/klage';
import { User } from '../user/user';

export interface AppContextType {
    user: User | null;
    klage: Klage | null;
    fullmaktsgiver: User | null;
    setKlage: (klage: Klage | null) => void;
    setUser: (user: User | null) => void;
    setFullmaktsgiver: (fullmaktsgiver: User | null) => void;
}

export const AppContext = React.createContext<AppContextType>({
    user: null,
    klage: null,
    fullmaktsgiver: null,
    setKlage: () => {},
    setUser: () => {},
    setFullmaktsgiver: () => {}
});

interface Props {
    children: JSX.Element;
}

const AppContextComponenet = (props: Props) => {
    const [klage, setKlage] = useState<Klage | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [fullmaktsgiver, setFullmaktsgiver] = useState<User | null>(null);
    const state: AppContextType = { klage, user, fullmaktsgiver, setKlage, setUser, setFullmaktsgiver };
    return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
};

export default AppContextComponenet;
