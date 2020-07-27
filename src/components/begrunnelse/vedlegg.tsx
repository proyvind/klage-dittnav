import React from 'react';
import { VedleggProps, Vedlegg } from '../../types/vedlegg';
import File from 'forhandsvisningsfil';
import styled, { keyframes } from 'styled-components';

interface Props {
    vedlegg: VedleggProps[];
    deleteAction: (vedlegg: VedleggProps) => void;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const FileDiv = styled.div`
    position: relative;
    &.animate {
        animation: ${fadeIn} 0.4s;
    }
`;

const VedleggVisning = (props: Props) => {
    if (props.vedlegg.length === 0) {
        return null;
    }

    const deleteVedlegg = (file: Vedlegg) => {
        let deletedItem = props.vedlegg.find(v => v.vedlegg.id === file.id);
        if (deletedItem) {
            props.deleteAction(deletedItem);
        } else {
            // TODO: Error handling
            console.log('Får ikke slettet vedlegg.');
        }
    };

    return (
        <FileDiv>
            {Array.from(props.vedlegg).map((vedlegg: VedleggProps, index: number) => (
                <File
                    file={vedlegg.vedlegg}
                    buttonsVisibility="always"
                    buttonsPosition="inside"
                    viewOnePage={true}
                    showAddButton
                    showDeleteButton
                    showDownloadButton
                    onAddFile={file => console.log('onAddFile: ', file)}
                    onDeleteFile={file => deleteVedlegg(file)}
                    onDownloadFile={file => console.log('onDownloadFile: ', file)}
                    onPreviousPage={file => console.log('onPreviousPage: ', file)}
                    onNextPage={file => console.log('onNextPage: ', file)}
                    scale={2}
                />
            ))}
        </FileDiv>
    );
};

export default VedleggVisning;
