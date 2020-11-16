import React from 'react';
import { ReactNode } from 'react';
import { Element } from 'nav-frontend-typografi';

interface Props {
    header: string;
    info: ReactNode;
}

const InformationPointBox = (props: Props) => (
    <div>
        <Element>{props.header}</Element>
        {props.info}
    </div>
);

export default InformationPointBox;
