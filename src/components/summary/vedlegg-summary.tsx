import React from 'react';
import styled from 'styled-components';
import { VedleggProps } from '../../types/vedlegg';

interface Props {
    vedlegg: VedleggProps[];
}

const Vedleggtekst = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: #3385d1;
`;

const VedleggSummary = (props: Props) => {
    return (
        <div>
            {Array.from(props.vedlegg).map((vedlegg: VedleggProps, index: number) => {
                return <Vedleggtekst key={index}>{vedlegg.vedlegg.tittel}</Vedleggtekst>;
            })}
        </div>
    );
};

export default VedleggSummary;
