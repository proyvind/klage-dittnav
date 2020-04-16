import React from 'react';
import { SkjemaGruppe, Input } from 'nav-frontend-skjema';

const KlageForm = () => {
    return (
        <SkjemaGruppe>
            <Input label="Fornavn" />
            <Input label="Etternavn" />
        </SkjemaGruppe>
    );
};

export default KlageForm;
