import { CheckmarkIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { Popover } from '@navikt/ds-react';
import { formatDate, formatISO, isToday } from 'date-fns';
import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from '@app/language/use-translation';

interface Props {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  lastSaved: Date;
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

export const AutosaveProgressIndicator = (props: Props) => {
  const { skjema } = useTranslation();
  const { popover, saved, failed } = skjema.begrunnelse.autosave;
  const anchor = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AutosaveContainer>
      <AutosaveContent ref={anchor} onClick={() => setIsOpen(!isOpen)}>
        {getContent(props, saved, failed)}
      </AutosaveContent>
      <Popover open={isOpen} anchorEl={anchor.current} onClose={() => setIsOpen(false)} placement="top-end">
        <Popover.Content>{popover}</Popover.Content>
      </Popover>
    </AutosaveContainer>
  );
};

const getContent = (status: Props, saved: string, failed: string) => {
  if (status.isError) {
    return (
      <>
        <XMarkOctagonIcon aria-hidden />
        {failed}
      </>
    );
  }

  return (
    <>
      <CheckmarkIcon aria-hidden />
      <span>
        {saved} {getDate(status.lastSaved)}
      </span>
    </>
  );
};

const getDate = (date: Date) => {
  if (isToday(date)) {
    return <time dateTime={formatISO(date)}>{formatDate(date, 'HH:mm:ss')}</time>;
  }

  return <time dateTime={formatISO(date)}>{formatDate(date, 'dd.MM.yyyy HH:mm:ss')}</time>;
};
