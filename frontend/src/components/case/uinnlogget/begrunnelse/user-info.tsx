import { TextField } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { ErrorState } from '../../../../hooks/use-errors';
import { useTranslation } from '../../../../language/use-translation';
import { ISessionAnke } from '../../../anke/uinnlogget/types';
import { FnrDnrInput } from '../../../fnr-dnr-input/fnr-dnr-input';
import { ISessionKlage } from '../../../klage/uinnlogget/types';
import { FormFieldsIds } from '../../common/form-fields-ids';
import { Validator, validateEtternavn, validateFornavn } from '../../common/validators';

interface Props {
  klageOrAnke: ISessionKlage | ISessionAnke;
  update: (update: Partial<ISessionKlage | ISessionAnke>) => void;
  onError: (id: FormFieldsIds, error?: string) => void;
  errors: ErrorState;
}

export const UserInfo = ({ klageOrAnke, update, onError, errors }: Props) => {
  const { common, error_messages } = useTranslation();

  const onChange = (foedselsnummer: string) => {
    if (klageOrAnke.foedselsnummer !== foedselsnummer) {
      update({ foedselsnummer });
    }
  };

  return (
    <StyledUserInfo>
      <FnrDnrInput
        value={klageOrAnke.foedselsnummer}
        onBlur={onChange}
        onChange={onChange}
        onError={onError}
        error={errors[FormFieldsIds.FNR_DNR_NPID]}
      />

      <TextInput
        id={FormFieldsIds.FORNAVN}
        label={common.fornavn}
        value={klageOrAnke.navn.fornavn}
        onChange={(fornavn) => update({ navn: { ...klageOrAnke.navn, fornavn } })}
        onError={onError}
        error={errors[FormFieldsIds.FORNAVN]}
        validator={validateFornavn(error_messages)}
      />

      <TextInput
        id={FormFieldsIds.ETTERNAVN}
        label={common.etternavn}
        value={klageOrAnke.navn.etternavn}
        onChange={(etternavn) => update({ navn: { ...klageOrAnke.navn, etternavn } })}
        onError={onError}
        error={errors[FormFieldsIds.ETTERNAVN]}
        validator={validateEtternavn(error_messages)}
      />
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled.div`
  display: flex;
  row-gap: 12px;
  flex-direction: column;
`;

interface TextInputProps {
  id: FormFieldsIds;
  value?: string;
  label: string;
  onChange: (value: string) => void;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
  validator: Validator;
}

const TextInput = ({ id, label, value = '', onChange, onError, error, validator }: TextInputProps) => (
  <TextField
    id={id}
    label={label}
    size="medium"
    value={value}
    onChange={({ target }) => onChange(target.value)}
    onBlur={({ target }) => onError(id, validator(target.value))}
    minLength={1}
    error={error}
  />
);
