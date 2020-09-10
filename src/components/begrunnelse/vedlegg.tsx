import React from 'react';
import { VedleggProps } from '../../types/vedlegg';
import File from 'forhandsvisningsfil';
import { FlexWithSpacingContainer, PaddingContainer } from '../../styled-components/main-styled-components';

interface Props {
    vedlegg: VedleggProps[];
    deleteAction: (vedlegg: VedleggProps) => void;
}

const VedleggVisning = (props: Props) => {
    if (props.vedlegg.length === 0) {
        return null;
    }

    const deleteVedlegg = (ifile: any) => {
        let deletedItem = props.vedlegg.find(v => v.vedlegg.id === ifile.id);
        if (deletedItem) {
            props.deleteAction(deletedItem);
        } else {
            // TODO: Error handling
            console.log('Får ikke slettet vedlegg.');
        }
    };

    return (
        <PaddingContainer>
            <FlexWithSpacingContainer>
                {Array.from(props.vedlegg).map((vedlegg: VedleggProps) => (
                    <File
                        className="file-flex-item"
                        file={vedlegg.vedlegg}
                        buttonsVisibility="always"
                        buttonsPosition="header"
                        viewOnePage={true}
                        showDeleteButton
                        onDeleteFile={file => deleteVedlegg(file)}
                        onPreviousPage={file => console.log('onPreviousPage: ', file)}
                        onNextPage={file => console.log('onNextPage: ', file)}
                        scale={2}
                    />
                ))}
            </FlexWithSpacingContainer>
        </PaddingContainer>
    );
};

export default VedleggVisning;
