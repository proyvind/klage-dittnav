import { TextField } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { ErrorState } from '@app/hooks/errors/types';
import { useTranslation } from '@app/language/use-translation';
import { FnrDnrInput } from '../../../fnr-dnr-input/fnr-dnr-input';
import { FormFieldsIds } from '../../common/form-fields-ids';
import { ISessionCase } from '../types';

type Data = Pick<ISessionCase, 'foedselsnummer' | 'navn'>;

interface Props {
  data: Data;
  update: (update: Data) => void;
  errors: ErrorState;
}

export const UserInfo = ({ data, update, errors }: Props) => {
  const { common } = useTranslation();

  const onChange = (foedselsnummer: string) => {
    if (data.foedselsnummer !== foedselsnummer) {
      update({ foedselsnummer, navn: data.navn });
    }
  };

  return (
    <StyledUserInfo>
      <FnrDnrInput value={data.foedselsnummer} onChange={onChange} error={errors[FormFieldsIds.FNR_DNR_NPID]} />

      <TextInput
        id={FormFieldsIds.FORNAVN}
        label={common.fornavn}
        value={data.navn.fornavn}
        onChange={(fornavn) => update({ foedselsnummer: data.foedselsnummer, navn: { ...data.navn, fornavn } })}
        error={errors[FormFieldsIds.FORNAVN]}
      />

      <TextInput
        id={FormFieldsIds.ETTERNAVN}
        label={common.etternavn}
        value={data.navn.etternavn}
        onChange={(etternavn) => update({ foedselsnummer: data.foedselsnummer, navn: { ...data.navn, etternavn } })}
        error={errors[FormFieldsIds.ETTERNAVN]}
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
  error: string | undefined;
}

const TextInput = ({ id, label, value = '', onChange, error }: TextInputProps) => (
  <TextField
    id={id}
    label={label}
    size="medium"
    value={value}
    onChange={({ target }) => onChange(target.value)}
    minLength={1}
    error={error}
  />
);
