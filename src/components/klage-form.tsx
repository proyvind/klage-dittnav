import React, { useState } from 'react';
import { SkjemaGruppe, Input, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { postKlage } from '../services/klageService';
import { setupMock } from '../mock-api/setup-mock';

setupMock();

const KlageForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tmpInput, setTmpInput] = useState<{ firstName: string; lastName: string; klageText: string }>({
        firstName: '',
        lastName: '',
        klageText: ''
    });

    const handleFormChange = (name: string, value: string) => {
        setTmpInput({ ...tmpInput, [name]: value });
    };

    const handleFormSubmit = (event: any) => {
        setIsLoading(true);
        event.preventDefault();
        postKlage(tmpInput).then(() => {
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <form onSubmit={handleFormSubmit} autoComplete="off">
            <SkjemaGruppe>
                <Input
                    name="firstName"
                    label="Fornavn"
                    value={tmpInput.firstName}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="lastName"
                    label="Etternavn"
                    value={tmpInput.lastName}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Textarea
                    name="klageText"
                    label="Din klage"
                    maxLength={0}
                    value={tmpInput.klageText}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Hovedknapp>Send klage</Hovedknapp>
            </SkjemaGruppe>
        </form>
    );
};

export default KlageForm;
