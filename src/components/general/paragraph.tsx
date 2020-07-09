import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { MarginContainer, MarginTopContainer } from '../../styled-components/main-styled-components';

export const Paragraph = (props: any) => {
    if (props.noSpaceBottom) {
        return (
            <MarginTopContainer>
                <Normaltekst>{props.children}</Normaltekst>
            </MarginTopContainer>
        );
    }
    return (
        <MarginContainer>
            <Normaltekst>{props.children}</Normaltekst>
        </MarginContainer>
    );
};

export default Paragraph;
