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
    const klageId = props.klage.id;
    if (typeof klageId === 'number') {
        return (
            <div>
                {Array.from(props.vedlegg)
                    .filter(({ vedlegg: { id } }) => !!id)
                    .map(({ vedlegg }) => (
                        <div>
                            <Lenke
                                className="no-background-style"
                                href={getVedleggUrl(klageId, vedlegg.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={vedlegg.id}
                            >
                                <Vedleggtekst>{vedlegg.name}</Vedleggtekst>
                            </Lenke>
                        </div>
                    ))}
            </div>
        );
    }
    return null;
};

export default VedleggSummary;
