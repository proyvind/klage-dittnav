import React from 'react';
import { Input } from 'nav-frontend-skjema';

interface Props {
    saksnummer: string | null;
    setSaksnummer: (saksnummer: string) => void;
}

const Saksnummer = ({ saksnummer, setSaksnummer }: Props) => (
    <Input
        label="Saksnummer (valgfri)"
        bredde="L"
        value={saksnummer ?? ''}
        onChange={e => setSaksnummer(e.target.value)}
    />
);

export default Saksnummer;
