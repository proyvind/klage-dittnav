import React, { useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { Ellipsis } from '../../../styled-components/ellipsis';
import Success from '../../../assets/images/icons/Success';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';

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
    margin-top: 16px;
    color: #78706a;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    div {
        cursor: pointer;
        > svg {
            margin-right: 5px;
        }
        display: flex;
        flex-flow: row wrap;
        align-items: center;
    }
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
                <p style={{ padding: '1rem' }}>Vi lagrer endringene dine automatisk.</p>
            </Popover>

            <AutosaveContainer>
                <div onClick={e => togglePopover(e.currentTarget)}>{getContent(props.autosaveStatus)}</div>
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
