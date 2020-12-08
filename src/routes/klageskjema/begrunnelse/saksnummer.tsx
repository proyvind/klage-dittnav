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
        inputMode="numeric"
        pattern="[0-9]*"
        value={saksnummer ?? ''}
        onChange={e => setSaksnummer(e.target.value)}
    />
);

export default Saksnummer;
