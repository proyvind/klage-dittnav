import React from 'react';
import styled from 'styled-components';
import { VedleggProps } from '../../types/vedlegg';
import Lenke from 'nav-frontend-lenker';
import { Klage } from '../../types/klage';
import { getVedleggUrl } from '../../clients/apiUrls';

interface Props {
    klage: Klage;
    vedlegg: VedleggProps[];
}

const Vedleggtekst = styled.span`
    font-size: 16px;
    line-height: 22px;
    color: #3385d1;
`;

const VedleggSummary = (props: Props) => {
    return (
        <div>
            {Array.from(props.vedlegg).map((vedlegg: VedleggProps, index: number) => {
                return (
                    props.klage.id &&
                    vedlegg.vedlegg.id && (
                        <div>
                            <Lenke
                                className="no-background-style"
                                href={getVedleggUrl(props.klage.id, vedlegg.vedlegg.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                            >
                                <Vedleggtekst>{vedlegg.vedlegg?.name}</Vedleggtekst>
                            </Lenke>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default VedleggSummary;
