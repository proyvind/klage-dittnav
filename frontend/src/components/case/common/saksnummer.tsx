import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Label, TextField } from '@navikt/ds-react';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useTranslation } from '@app/language/use-translation';

interface Props {
  value: string | null;
  internalSaksnummer?: string | null;
  onChange: (saksnummer: string | null) => void;
  error: string | undefined;
}

export const DebouncedSaksnummer = ({ value, onChange, ...props }: Props) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value === localValue) {
      return;
    }

    const timeout = setTimeout(() => onChange(localValue), 1000);

    return () => clearTimeout(timeout);
  }, [onChange, value, localValue]);

  return <Saksnummer {...props} value={localValue} onChange={setLocalValue} />;
};

export const Saksnummer = ({ value, internalSaksnummer, onChange, error }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { skjema } = useTranslation();

  if (typeof internalSaksnummer === 'string' && internalSaksnummer.length !== 0) {
    return (
      <div>
        <Label>{skjema.begrunnelse.saksnummer.internalTitle}</Label>
        <Row>
          <BodyShort>{internalSaksnummer}</BodyShort>
          <Button
            title={skjema.begrunnelse.saksnummer.change}
            onClick={() => {
              onChange(internalSaksnummer);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            size="small"
            icon={<PencilIcon aria-hidden />}
            variant="tertiary"
          />
        </Row>
      </div>
    );
  }

  return (
    <TextField
      id={FormFieldsIds.SAKSNUMMER}
      label={skjema.begrunnelse.saksnummer.title}
      value={value ?? ''}
      onChange={({ target }) => onChange(target.value.length === 0 ? null : target.value)}
      htmlSize={24}
      error={error}
      ref={inputRef}
    />
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;
