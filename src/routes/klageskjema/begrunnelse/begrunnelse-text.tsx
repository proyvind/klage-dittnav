import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';

interface Props {
    fritekst: string;
    setFritekst: (fritekst: string) => void;
    showErrors: boolean;
    id: string;
    placeholder: string;
    description: string;
    errorText: string;
}

const BegrunnelseText = ({ id, fritekst, setFritekst, showErrors, placeholder, description, errorText }: Props) => {
    const [isValid, setIsValid] = useState<boolean>(fritekst.length !== 0);

    return (
        <Textarea
            id={id}
            value={fritekst}
            description={description}
            placeholder={placeholder}
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
            feil={getError(showErrors, isValid, errorText)}
        />
    );
};

function getError(showErrors: boolean, isValid: boolean, message: string) {
    if (showErrors && !isValid) {
        return message;
    }
    return null;
}

export default BegrunnelseText;
