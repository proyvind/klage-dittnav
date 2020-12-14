import React from 'react';
import styled from 'styled-components/macro';
import { Input } from 'nav-frontend-skjema';

interface Props {
    saksnummer: string | null;
    setSaksnummer: (saksnummer: string) => void;
    title: string;
}

const MarginInput = styled(Input)`
    && {
        margin-bottom: 32px;
    }
`;

const Saksnummer = ({ title, saksnummer, setSaksnummer }: Props) => (
    <MarginInput label={title} bredde="L" value={saksnummer ?? ''} onChange={e => setSaksnummer(e.target.value)} />
);

export default Saksnummer;
