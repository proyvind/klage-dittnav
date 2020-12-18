import React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import { Reason } from '../../../klage/klage';
import { reasonTexts } from '../begrunnelse/reasons';

interface Props {
    checkboxesSelected: Reason[];
}

const Checkboxes = ({ checkboxesSelected }: Props) => {
    if (checkboxesSelected.length === 0) {
        return <Normaltekst>Ikke spesifisert.</Normaltekst>;
    }

    return (
        <CheckboxList>
            {checkboxesSelected.map(c => (
                <CheckboxListItem key={c}>{reasonTexts[c]}</CheckboxListItem>
            ))}
        </CheckboxList>
    );
};

export default Checkboxes;

const CheckboxList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const CheckboxListItem = styled.li`
    :not(:last-child) {
        margin-bottom: 4px;
    }
`;
