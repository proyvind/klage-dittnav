import React from 'react';
import { Element } from 'nav-frontend-typografi';

const DummyRedirectPage = () => (
    <>
        <Element>Eksempel på redirect</Element>
        <a
            href="/?tittel=MittVedtak&vedtaksdato=1992-02-21&tema=FOR&enhet=MinEnhet&NAV_referanse=ReferansenMin"
            className="knapp"
        >
            Forhåndsutfylt klageskjema
        </a>
    </>
);

export default DummyRedirectPage;
