import { ErrorColored, SuccessColored } from '@navikt/ds-icons';
import { Popover } from '@navikt/ds-react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Language } from '../../language/language';
import { Ellipsis } from '../../styled-components/ellipsis';

export enum AutosaveStatus {
  NONE,
  SAVING,
  SAVED,
  FAILED,
}

interface StatusProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface Props extends StatusProps {
  translations: Language['klageskjema' | 'ankeskjema'];
}

const AutosaveContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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

export const AutosaveProgressIndicator = ({ translations, ...props }: Props) => {
  const { popover, saving, saved, failed } = translations.begrunnelse.autosave;
  const anchor = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AutosaveContainer>
      <AutosaveContent ref={anchor} onClick={() => setIsOpen(!isOpen)}>
        {getContent(props, saving, saved, failed)}
      </AutosaveContent>
      <Popover open={isOpen} anchorEl={anchor.current} onClose={() => setIsOpen(false)} placement="top-end">
        <Popover.Content>{popover}</Popover.Content>
      </Popover>
    </AutosaveContainer>
  );
};

const getContent = (status: StatusProps, saving: string, saved: string, failed: string) => {
  if (status.isLoading) {
    return <Ellipsis>{saving}</Ellipsis>;
  }

  if (status.isSuccess) {
    return (
      <>
        <SuccessColored />
        <>{saved}</>
      </>
    );
  }

  if (status.isError) {
    return (
      <>
        <ErrorColored />
        {failed}
      </>
    );
  }

  return null;
};
