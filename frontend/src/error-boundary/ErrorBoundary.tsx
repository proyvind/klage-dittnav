import { Alert } from '@navikt/ds-react';
import React from 'react';
import { logger } from '../logging/frontend-logger';

interface Props {
  boundaryName?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    const message = `ErrorBoundary${
      typeof this.props.boundaryName === 'string' ? ' i ' + this.props.boundaryName : ''
    }`;
    logger.error({ message, error, reactInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return <Alert variant="warning">Beklager, det skjedde en feil. ({this.props.boundaryName})</Alert>;
    }

    return this.props.children;
  }
}
