import React from 'react';
import { ReactNode } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const InformationPointBox = (props: { header: string; info: ReactNode }) => {
    return (
        <div>
            <Element>{props.header}</Element>
            <Normaltekst>{props.info}</Normaltekst>
        </div>
    );
};

export default InformationPointBox;
