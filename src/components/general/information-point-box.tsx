import React from 'react';
import { ReactNode } from 'react';
import { Element } from 'nav-frontend-typografi';

const InformationPointBox = (props: { header: string; info: ReactNode }) => {
    return (
        <div>
            <Element>{props.header}</Element>
            {props.info}
        </div>
    );
};

export default InformationPointBox;
