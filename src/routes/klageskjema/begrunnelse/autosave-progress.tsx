import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Element } from 'nav-frontend-typografi';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Ellipsis } from '../../../styled-components/ellipsis';
import Success from '../../../icons/SuccessIcon';
import { useTranslation } from '../../../language/use-translation';

export enum AutosaveStatus {
    NONE,
    SAVING,
    SAVED,
    FAILED
}

interface Props {
    autosaveStatus: AutosaveStatus;
}

const AutosaveContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    color: #78706a;
    text-align: right;
    margin-top: 4px;
`;

const AutosaveContent = styled.div`
    cursor: pointer;
    > svg {
        margin-right: 5px;
    }
    display: flex;
    flex-flow: row wrap;
    align-items: center;
`;

const AutosaveProgressIndicator = (props: Props) => {
    const { klageskjema } = useTranslation();
    const { popover, saving, saved, failed } = klageskjema.begrunnelse.autosave;
    const [anker, setAnker] = useState<(EventTarget & HTMLDivElement) | undefined>(undefined);

    const togglePopover = (ankerEl: EventTarget & HTMLDivElement): void => setAnker(anker ? undefined : ankerEl);

    return (
        <>
            <Popover
                ankerEl={anker}
                onRequestClose={() => setAnker(undefined)}
                orientering={PopoverOrientering.OverHoyre}
            >
                <p style={{ padding: '16px' }}>{popover}</p>
            </Popover>

            <AutosaveContainer>
                <AutosaveContent onClick={e => togglePopover(e.currentTarget)}>
                    {getContent(props.autosaveStatus, saving, saved, failed)}
                </AutosaveContent>
            </AutosaveContainer>
        </>
    );
};

const getContent = (status: AutosaveStatus, saving: string, saved: string, failed: string) => {
    if (status === AutosaveStatus.SAVING) {
        return (
            <Element>
                <Ellipsis>{saving}</Ellipsis>
            </Element>
        );
    }
    if (status === AutosaveStatus.SAVED) {
        return (
            <>
                <Success />
                <Element>{saved}</Element>
            </>
        );
    }
    if (status === AutosaveStatus.FAILED) {
        return <Element>{failed}</Element>;
    }
    return null;
};

export default AutosaveProgressIndicator;
