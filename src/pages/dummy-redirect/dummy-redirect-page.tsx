import React from 'react';
import { Element } from 'nav-frontend-typografi';

const DummyRedirectPage = () => (
    <>
        <Element>Eksempel på redirect</Element>
        <a
            href="/?tittel=MittVedtak&vedtaksdato=21-02-1992&tema=tema&enhet=MinEnhet&NAV_referanse=ReferansenMin"
            className="knapp"
        >
            Forhåndsutfylt klageskjema
        </a>
    </>
);

export default DummyRedirectPage;
