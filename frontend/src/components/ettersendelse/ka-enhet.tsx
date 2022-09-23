import { Radio, RadioGroup, Select } from '@navikt/ds-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../language/use-translation';
import { useKlageenheterForAnke } from '../../simple-api-state/use-kodeverk';
import { FormFieldsIds } from '../case/common/form-fields-ids';

interface Props {
  enhet: string | null;
  onChange: (enhet: string | null) => void;
  error: string | undefined;
}

export const KaEnhet = ({ enhet, onChange, error }: Props) => {
  const [hasReceived, setHasReceived] = useState(false);
  const { common, ettersendelse } = useTranslation();

  return (
    <>
      <RadioGroup value={hasReceived} legend={ettersendelse.enhet.radio_title}>
        <HorizontalButtons>
          <Radio
            value={true}
            onChange={() => {
              setHasReceived(true);
              onChange(NONE);
            }}
          >
            {common.yes}
          </Radio>
          <Radio
            value={false}
            onChange={() => {
              setHasReceived(false);
              onChange(null);
            }}
          >
            {common.no}
          </Radio>
        </HorizontalButtons>
      </RadioGroup>
      <KaEnhetSelect enhet={enhet} onChange={onChange} error={error} show={hasReceived} />
    </>
  );
};

interface KaEnhetProps extends Props {
  show: boolean;
}

const KaEnhetSelect = ({ enhet, onChange, error, show }: KaEnhetProps) => {
  const { ettersendelse } = useTranslation();
  const { data, isLoading } = useKlageenheterForAnke();

  if (!show) {
    return null;
  }

  const onInternalChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => onChange(target.value);

  return (
    <Select
      id={FormFieldsIds.KLAGEENHET_ANKE}
      label={ettersendelse.enhet.select_title}
      disabled={isLoading}
      value={enhet ?? NONE}
      onChange={onInternalChange}
      error={error}
    >
      <option disabled value={NONE}>
        {ettersendelse.enhet.none}
      </option>
      {data?.map((k) => (
        <option key={k.id} value={k.id}>
          {k.navn}
        </option>
      ))}
    </Select>
  );
};

const NONE = 'NONE';

const HorizontalButtons = styled.div`
  display: flex;
  gap: 32px;
`;
