import React from 'react';
import styled from 'styled-components/macro';
import { Input } from 'nav-frontend-skjema';

interface Props {
    saksnummer: string | null;
    setSaksnummer: (saksnummer: string) => void;
}

const MarginInput = styled(Input)`
    && {
        margin-bottom: 32px;
    }
`;

const Saksnummer = ({ saksnummer, setSaksnummer }: Props) => (
    <MarginInput
        label="Saksnummer (valgfri)"
        bredde="L"
        value={saksnummer ?? ''}
        onChange={e => setSaksnummer(e.target.value)}
    />
);

export default Saksnummer;
