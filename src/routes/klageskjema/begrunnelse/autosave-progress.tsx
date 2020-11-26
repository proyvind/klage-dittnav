import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Element } from 'nav-frontend-typografi';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Ellipsis } from '../../../styled-components/ellipsis';
import Success from '../../../icons/SuccessIcon';

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
    color: #78706a;
    text-align: right;
    display: flex;
    justify-content: flex-end;
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
    const [anker, setAnker] = useState<(EventTarget & HTMLDivElement) | undefined>(undefined);

    const togglePopover = (ankerEl: EventTarget & HTMLDivElement): void => setAnker(anker ? undefined : ankerEl);

    return (
        <>
            <Popover
                ankerEl={anker}
                onRequestClose={() => setAnker(undefined)}
                orientering={PopoverOrientering.OverHoyre}
            >
                <p style={{ padding: '16px' }}>Vi lagrer endringene dine automatisk.</p>
            </Popover>

            <AutosaveContainer>
                <AutosaveContent onClick={e => togglePopover(e.currentTarget)}>
                    {getContent(props.autosaveStatus)}
                </AutosaveContent>
            </AutosaveContainer>
        </>
    );
};

const getContent = (status: AutosaveStatus) => {
    if (status === AutosaveStatus.SAVING) {
        return (
            <Element>
                <Ellipsis>Lagrer</Ellipsis>
            </Element>
        );
    }
    if (status === AutosaveStatus.SAVED) {
        return (
            <>
                <Success />
                <Element>Lagret</Element>
            </>
        );
    }
    if (status === AutosaveStatus.FAILED) {
        return <Element>Klarte ikke lagre</Element>;
    }
    return null;
};

export default AutosaveProgressIndicator;
