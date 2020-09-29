import React from 'react';
import styled from 'styled-components';
import { VedleggFile } from '../../types/vedlegg';
import Lenke from 'nav-frontend-lenker';
import { Klage } from '../../types/klage';
import { getVedleggUrl } from '../../clients/apiUrls';

interface Props {
    klage: Klage;
    vedlegg: VedleggFile[];
}

const Vedleggtekst = styled.span`
    font-size: 16px;
    line-height: 22px;
    color: #3385d1;
`;

const VedleggSummary = (props: Props) => (
    <div>
        {props.vedlegg.map(({ id, name }) => (
            <div key={id}>
                <Lenke
                    className="no-background-style"
                    href={getVedleggUrl(props.klage.id, id)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Vedleggtekst>{name}</Vedleggtekst>
                </Lenke>
            </div>
        ))}
    </div>
);

export default VedleggSummary;
