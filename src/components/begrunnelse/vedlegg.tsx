import React, { useState } from 'react';
import { VedleggFile } from '../../types/vedlegg';
import File from 'forhandsvisningsfil';
import {
    FlexWithSpacingContainer,
    PaddingContainer,
    matchMediaQueries
} from '../../styled-components/main-styled-components';

interface Props {
    vedlegg: VedleggFile[];
    deleteAction: (vedlegg: VedleggFile) => void;
}

const VedleggVisning = (props: Props) => {
    const [smallMobileMode, setSmallMobileMode] = useState<boolean>(matchMediaQueries.mobileS.matches);

    if (props.vedlegg.length === 0) {
        return null;
    }

    matchMediaQueries.mobileS.addListener(width => {
        setSmallMobileMode(width.matches);
    });

    return (
        <PaddingContainer>
            <FlexWithSpacingContainer className="center-in-mobile">
                {Array.from(props.vedlegg).map(vedlegg => (
                    <div className="file-flex-item" key={vedlegg.id}>
                        <File
                            file={vedlegg}
                            buttonsVisibility="always"
                            buttonsPosition="header"
                            viewOnePage={true}
                            showDeleteButton
                            onDeleteFile={() => props.deleteAction(vedlegg)}
                            scale={smallMobileMode ? 1 : 2}
                        />
                    </div>
                ))}
            </FlexWithSpacingContainer>
        </PaddingContainer>
    );
};

export default VedleggVisning;
