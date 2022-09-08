import { Alert, BodyShort } from '@navikt/ds-react';
import { FallbackRender } from '@sentry/react';
import React from 'react';
import { addErrorEvent, sendErrorReport } from '../logging/error-report/error-report';

export const SentryFallback: FallbackRender = ({ error, componentStack, eventId }) => {
  addErrorEvent(error.message, error.stack, componentStack ?? undefined, eventId ?? undefined);
  sendErrorReport();

  return (
    <Alert variant="warning">
      <BodyShort>Beklager, det skjedde en feil.</BodyShort>
      <BodyShort>Sorry, something went wrong.</BodyShort>
    </Alert>
  );
};
