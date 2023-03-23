import { ErrorSummary } from '@navikt/ds-react';
import React from 'react';
import { isNotNull, isNotUndefined } from '@app/functions/is-not-type-guards';
import { useTranslation } from '@app/language/use-translation';
import { FormFieldsIds } from './form-fields-ids';

type Props = Record<FormFieldsIds, string | undefined>;

const FORM_FIELD_IDS = Object.values(FormFieldsIds);

export const Errors = (props: Props) => {
  const { error_messages } = useTranslation();

  const hasErrors = Object.values(props).some(isNotUndefined);

  if (!hasErrors) {
    return null;
  }

  const errors = FORM_FIELD_IDS.map((id) => getErrorItem(`#${id}`, props[id])).filter(isNotNull);

  if (errors.length === 0) {
    return null;
  }

  return <ErrorSummary heading={error_messages.skjema.title}>{errors}</ErrorSummary>;
};

const getErrorItem = (href: string, error?: string | null) => {
  if (error === null || typeof error === 'undefined') {
    return null;
  }

  return (
    <ErrorSummary.Item key={href} href={href}>
      {error}
    </ErrorSummary.Item>
  );
};
