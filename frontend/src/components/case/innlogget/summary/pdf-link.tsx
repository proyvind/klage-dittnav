import { Button, Checkbox, CheckboxGroup, ReadMore } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../../language/use-translation';
import { useUpdateAnkeMutation } from '../../../../redux-api/case/anke/api';
import { useUpdateKlageMutation } from '../../../../redux-api/case/klage/api';
import { CenteredContainer } from '../../../../styled-components/common';

interface Props extends CheckboxProps {
  hasUploadedVedlegg: boolean;
  href: string;
  show: boolean;
  text: string;
  type: 'klage' | 'anke';
}

export const PdfLink = ({ text, show, hasUploadedVedlegg, href, type, id, ...props }: Props) => {
  const navigate = useNavigate();
  const { common } = useTranslation();
  const fixedCacheKey = `${id}-hasVedlegg`;
  const [, { isLoading: klageIsLoading, isError: klageError }] = useUpdateKlageMutation({ fixedCacheKey });
  const [, { isLoading: ankeIsLoading, isError: ankeError }] = useUpdateAnkeMutation({ fixedCacheKey });

  const isLoading = klageIsLoading || ankeIsLoading;
  const isError = klageError || ankeError;

  if (!show) {
    return null;
  }

  if (hasUploadedVedlegg) {
    return (
      <CenteredContainer>
        <Button
          as="a"
          href={href}
          target="_blank"
          onClick={() => navigate('../innsending')}
          size="small"
          variant="tertiary"
        >
          {text}
        </Button>
      </CenteredContainer>
    );
  }

  const CaseCheckbox = type === 'klage' ? KlageCheckbox : AnkeCheckbox;

  return (
    <CenteredContainer>
      <ReadMore size="small" header={text}>
        <CheckboxGroup error={isError ? common.generic_error : undefined} legend={text} hideLegend size="small">
          <CaseCheckbox {...props} id={id} />
        </CheckboxGroup>
        <Button
          as="a"
          loading={isLoading}
          href={href}
          target="_blank"
          onClick={isLoading ? (e) => e.preventDefault() : () => navigate('../innsending')}
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
  hasVedlegg: boolean;
  id: string;
}

const KlageCheckbox = ({ id, hasVedlegg }: CheckboxProps) => {
  const [updateKlage, { isError }] = useUpdateKlageMutation({ fixedCacheKey: `${id}-hasVedlegg` });
  const { klageskjema_post } = useTranslation();

  return (
    <Checkbox
      checked={hasVedlegg}
      onChange={({ target }) => updateKlage({ id, key: 'hasVedlegg', value: target.checked })}
      size="small"
      error={isError}
    >
      {klageskjema_post.has_attachments_label}
    </Checkbox>
  );
};

const AnkeCheckbox = ({ id, hasVedlegg }: CheckboxProps) => {
  const [updateAnke, { isError }] = useUpdateAnkeMutation({ fixedCacheKey: `${id}-hasVedlegg` });
  const { ankeskjema_post } = useTranslation();

  return (
    <Checkbox
      checked={hasVedlegg}
      onChange={({ target }) => updateAnke({ id, key: 'hasVedlegg', value: target.checked })}
      size="small"
      error={isError}
    >
      {ankeskjema_post.has_attachments_label}
    </Checkbox>
  );
};