import React from 'react';
import { Element } from 'nav-frontend-typografi';

const DummyRedirectPage = () => (
    <>
        <Element>Eksempel på redirect</Element>
        <a
            href="/foreldrepenger/klage?tittel=MittVedtak&vedtaksdato=1992-02-21&tema=FOR&enhet=1234&NAV_referanse=25555"
            className="knapp"
        >
            Forhåndsutfylt klageskjema
        </a>
    </>
);

export default DummyRedirectPage;
