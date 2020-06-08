import React from 'react';
import styled from 'styled-components';

interface Props {
    vedlegg: File[];
}

const Vedleggtekst = styled.p`
    font-size: 16px;
    line-height: 22px;
    color: #3385d1;
`;

const VedleggSummary = (props: Props) => {
    return (
        <div>
            {Array.from(props.vedlegg).map((vedlegg: File, index: number) => {
                return <Vedleggtekst key={index}>{vedlegg.name}</Vedleggtekst>;
            })}
        </div>
    );
};

export default VedleggSummary;
