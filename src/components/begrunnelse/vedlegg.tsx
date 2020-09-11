import React, { useState } from 'react';
import { VedleggProps } from '../../types/vedlegg';
import File, { IFile } from 'forhandsvisningsfil';
import {
    FlexWithSpacingContainer,
    PaddingContainer,
    matchMediaQueries
} from '../../styled-components/main-styled-components';

interface Props {
    vedlegg: VedleggProps[];
    deleteAction: (vedlegg: VedleggProps) => void;
}

const VedleggVisning = (props: Props) => {
    const [smallMobileMode, setSmallMobileMode] = useState<boolean>(matchMediaQueries.mobileS.matches);

    if (props.vedlegg.length === 0) {
        return null;
    }

    matchMediaQueries.mobileS.addListener(width => {
        setSmallMobileMode(width.matches);
    });

    const deleteVedlegg = (ifile: IFile) => {
        const deletedItem = props.vedlegg.find(v => v.vedlegg.id === ifile.id);
        if (deletedItem) {
            props.deleteAction(deletedItem);
        } else {
            // TODO: Error handling
            console.log('Får ikke slettet vedlegg.');
        }
    };

    return (
        <PaddingContainer>
            <FlexWithSpacingContainer className="center-in-mobile">
                {Array.from(props.vedlegg).map((vedlegg: VedleggProps, index: number) => (
                    <div className="file-flex-item" key={index}>
                        <File
                            file={vedlegg.vedlegg}
                            buttonsVisibility="always"
                            buttonsPosition="header"
                            viewOnePage={true}
                            showDeleteButton
                            onDeleteFile={file => deleteVedlegg(file)}
                            onPreviousPage={file => console.log('onPreviousPage: ', file)}
                            onNextPage={file => console.log('onNextPage: ', file)}
                            scale={smallMobileMode ? 1 : 2}
                        />
                    </div>
                ))}
            </FlexWithSpacingContainer>
        </PaddingContainer>
    );
};

export default VedleggVisning;
