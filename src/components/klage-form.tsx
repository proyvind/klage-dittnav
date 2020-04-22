import React, { useState } from 'react';
import { SkjemaGruppe, Input, Textarea, Select, FnrInput } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { postKlage } from '../services/klageService';
import { setupMock } from '../mock-api/setup-mock';
import { Klage } from '../types/klage';

setupMock();

const getRandomSimpleId = (): number => {
    return Math.floor(Math.random() * 10000);
};

const KlageForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tmpInput, setTmpInput] = useState<Klage>({
        id: getRandomSimpleId(),
        userFirstName: '',
        userLastName: '',
        userAddress: '',
        userFodselsnummer: '',
        userPhone: '',
        NAVEnhetNavn: '',
        vedteksdato: '',
        NAVReference: '',
        shortWhyShouldChange: '',
        longWhyShouldChange: '',
        attachments: '',
        place: '',
        date: '',
        userSignature: '',
        NAVSignature: ''
    });
    const [isValid, setIsValid] = useState<boolean>(true);

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
            <SkjemaGruppe legend="Kundeinformasjon">
                <Input
                    name="userFirstName"
                    label="Fornavn"
                    value={tmpInput.userFirstName}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="userLastName"
                    label="Etternavn"
                    value={tmpInput.userLastName}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="userAddress"
                    label="Addresse"
                    value={tmpInput.userAddress}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <FnrInput
                    name="userFodselsnummer"
                    label="Fødselsnummer (11 siffer)"
                    bredde="S"
                    value={tmpInput.userFodselsnummer}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                    onValidate={valid => setIsValid(valid)}
                    feil={isValid || !tmpInput.userFodselsnummer ? undefined : 'Ugyldig fødselsnummer'}
                />
                <Input
                    name="userPhone"
                    label="Telefonnummer"
                    value={tmpInput.userPhone}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
            </SkjemaGruppe>
            <SkjemaGruppe legend="Vedtaksinformasjon">
                <Select
                    name="NAVEnhetNavn"
                    label="NAV-enhet"
                    value="tmpInput.NAVEnhetNavn"
                    selected="tmpInput.NAVEnhetNavn"
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                >
                    <option value="">Velg NAV-enhet</option>
                    <option value="testenhet1">Test-enhet 1</option>
                    <option value="testenhet2">Test-enhet 2</option>
                </Select>
                <Input
                    name="vedteksdato"
                    label="Vedteksdato"
                    value={tmpInput.vedteksdato}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="NAVReference"
                    label="NAV-referanse"
                    value={tmpInput.NAVReference}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Textarea
                    name="shortWhyShouldChange"
                    label="Din klage (kort)"
                    maxLength={0}
                    value={tmpInput.shortWhyShouldChange}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Textarea
                    name="longWhyShouldChange"
                    label="Din klage (lang)"
                    maxLength={0}
                    value={tmpInput.longWhyShouldChange}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="attachments"
                    label="Vedlegg"
                    value={tmpInput.attachments}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="place"
                    label="Sted"
                    value={tmpInput.place}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="date"
                    label="Dato"
                    value={tmpInput.date}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="userSignature"
                    label="Din signatur"
                    value={tmpInput.userSignature}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
                <Input
                    name="NAVSignature"
                    label="NAVs signatur"
                    value={tmpInput.NAVSignature}
                    onChange={e => handleFormChange(e.target.name, e.target.value)}
                />
            </SkjemaGruppe>
            <Hovedknapp>Send klage</Hovedknapp>
        </form>
    );
};

export default KlageForm;
