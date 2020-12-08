import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';

interface Props {
    fritekst: string;
    setFritekst: (fritekst: string) => void;
    showErrors: boolean;
}

const BegrunnelseText = ({ fritekst, setFritekst, showErrors }: Props) => {
    const [isValid, setIsValid] = useState<boolean>(fritekst.length !== 0);

    return (
        <Textarea
            value={fritekst}
            description={INPUTDESCRIPTION}
            placeholder="Skriv inn din begrunnelse her."
            maxLength={0}
            minLength={1}
            onChange={e => {
                const fritekst = e.target.value;
                setFritekst(fritekst);
                setIsValid(fritekst.length !== 0);
            }}
            style={{
                minHeight: '180px'
            }}
            feil={getError(showErrors, isValid)}
        />
    );
};

function getError(showErrors: boolean, isValid: boolean) {
    if (showErrors && !isValid) {
        return 'Du må skrive en begrunnelse før du går videre.';
    }
    return null;
}

const INPUTDESCRIPTION =
    'Forklar med dine egne ord hva som gjør at du er uenig og hva du ønsker endret. Legg ved dokumenter som kan vise NAV hvorfor du er uenig.';

export default BegrunnelseText;
