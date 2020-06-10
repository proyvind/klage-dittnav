import React from 'react';
import {VedleggProps} from "../../types/vedlegg";
import {getDeleteVedleggUrl} from "../../clients/apiUrls";
import {Normaltekst} from "nav-frontend-typografi";

interface Props {
    vedlegg: VedleggProps;
    deleteAction: () => void;
}

const VedleggVisning = (props: Props) => {

    const deleteVedlegg = (id?: number) => {
        if (!id) {
            props.deleteAction();
            return;
        }

        fetch(getDeleteVedleggUrl(1, 1), {
            method: 'DELETE'
        }).then(result => {
            console.log(result);
            props.deleteAction();
        }).catch(error => {
            console.log(error);
        })
    };

    return (
        <>
            <Normaltekst>{props.vedlegg.file.name}</Normaltekst>
            <Normaltekst>{props.vedlegg.message}</Normaltekst>
            <a href={''} onClick={() => deleteVedlegg(props.vedlegg.id)}>Delete</a>
        </>
    );
}

export default VedleggVisning;
