import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { MarginContainer, MarginTopContainer } from '../../styled-components/main-styled-components';

interface Props {
    noSpaceOn?: 'top' | 'bottom';
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
}
export const Paragraph = (props: Props) => {
    if (props.noSpaceOn === 'bottom') {
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
