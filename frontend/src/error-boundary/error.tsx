import { Alert } from '@navikt/ds-react';
import React from 'react';

export interface HTTPError {
  code: number;
  text: string;
}

interface Props {
  error: HTTPError;
}

export const Error = (props: Props) => {
  const { error } = props;
  return (
    <Alert variant="error">
      Oisann, noe gikk galt!
      <br />
      {error.code && <span>{`${error.code}: `}</span>}
      {error.text && <span>{`${error.text}`}</span>}
    </Alert>
  );
};
