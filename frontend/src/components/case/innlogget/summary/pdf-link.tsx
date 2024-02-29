import { Button, Checkbox, CheckboxGroup, ReadMore } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useUpdateCaseMutation } from '@app/redux-api/case/api';
import { CenteredContainer } from '@app/styled-components/common';

interface Props extends CheckboxProps {
  hasUploadedVedlegg: boolean;
  hasVedlegg: boolean;
  href: string;
  show: boolean;
  text: string;
}

export const PdfLink = ({ text, show, hasUploadedVedlegg, href, id, hasVedlegg }: Props) => {
  const navigate = useNavigate();
  const { common } = useTranslation();
  const fixedCacheKey = `${id}-hasVedlegg`;
  const [, { isLoading, isError }] = useUpdateCaseMutation({ fixedCacheKey });

  if (!show) {
    return null;
  }

  const onClick = () => {
    addAppEvent(AppEventEnum.DOWNLOAD);
    navigate('../innsending');
  };

  if (hasUploadedVedlegg) {
    return (
      <CenteredContainer>
        <Button as="a" href={href} target="_blank" onClick={onClick} size="small" variant="tertiary">
          {text}
        </Button>
      </CenteredContainer>
    );
  }

  return (
    <CenteredContainer>
      <ReadMore size="small" header={text}>
        <CheckboxGroup
          error={isError ? common.generic_error : undefined}
          legend={text}
          hideLegend
          size="small"
          value={hasVedlegg ? ['hasVedlegg'] : []}
        >
          <KlageCheckbox id={id} />
        </CheckboxGroup>
        <Button
          as="a"
          loading={isLoading}
          href={href}
          target="_blank"
          onClick={isLoading ? (e) => e.preventDefault() : () => onClick()}
          size="small"
          variant="tertiary"
        >
          {common.download}
        </Button>
      </ReadMore>
    </CenteredContainer>
  );
};

interface CheckboxProps {
  id: string;
}

const KlageCheckbox = ({ id }: CheckboxProps) => {
  const [updateCase, { isError }] = useUpdateCaseMutation({ fixedCacheKey: `${id}-hasVedlegg` });

  return <CaseCheckbox id={id} isError={isError} onChange={(value) => updateCase({ id, key: 'hasVedlegg', value })} />;
};

interface CaseCheckboxProps {
  onChange: (value: boolean) => void;
  isError: boolean;
  id: string;
}

const CaseCheckbox = ({ id, isError, onChange }: CaseCheckboxProps) => {
  const { common } = useTranslation();

  return (
    <Checkbox
      id={id}
      value="hasVedlegg"
      onChange={({ target }) => onChange(target.checked)}
      size="small"
      error={isError}
    >
      {common.has_attachments_label}
    </Checkbox>
  );
};
