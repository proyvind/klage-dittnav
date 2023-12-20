import { Alert, BodyShort } from '@navikt/ds-react';
import React, { Component, ErrorInfo } from 'react';
import { addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    addErrorEvent(error.message, error.stack);
    sendErrorReport();
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="warning">
          <BodyShort>Beklager, det skjedde en feil.</BodyShort>
          <BodyShort>Sorry, something went wrong.</BodyShort>
        </Alert>
      );
    }

    return this.props.children;
  }
}
