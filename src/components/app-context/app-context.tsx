import React, { useState } from 'react';
import { Klage } from '../../types/klage';
import { User } from '../../types/user';

export interface AppContextType {
    user: User | null;
    klage: Klage | null;
    setKlage: (klage: Klage | null) => void;
    setUser: (user: User | null) => void;
}

export const AppContext = React.createContext<AppContextType>({
    user: null,
    klage: null,
    setKlage: () => {},
    setUser: () => {}
});

interface Props {
    children: JSX.Element;
}

const AppContextComponenet = (props: Props) => {
    const [klage, setKlage] = useState<Klage | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const state: AppContextType = { klage, user, setKlage, setUser };
    return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
};

export default AppContextComponenet;
