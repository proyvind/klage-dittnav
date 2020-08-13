import React from 'react';
import { Element } from 'nav-frontend-typografi';

const DummyRedirectPage = () => (
    <>
        <Element>Eksempel på redirect</Element>
        <a href="/klage?referanse=12345&tema=FOR&stonad=engangsstønad" className="knapp">
            Forhåndsutfylt klageskjema
        </a>
    </>
);

export default DummyRedirectPage;
