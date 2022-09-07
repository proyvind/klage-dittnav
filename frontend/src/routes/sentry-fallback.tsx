import { Alert, BodyShort } from '@navikt/ds-react';
import { FallbackRender } from '@sentry/react';
import React from 'react';
import { addErrorEvent, logAllUserEvents } from '../logging/user-trace';

export const SentryFallback: FallbackRender = ({ error, componentStack, eventId }) => {
  addErrorEvent(error.message, error.stack, componentStack ?? undefined, eventId ?? undefined);
  logAllUserEvents();

  return (
    <Alert variant="warning">
      <BodyShort>Beklager, det skjedde en feil.</BodyShort>
      <BodyShort>Sorry, something went wrong.</BodyShort>
    </Alert>
  );
};
