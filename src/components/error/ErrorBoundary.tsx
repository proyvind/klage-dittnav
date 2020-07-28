import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { logError } from '../../utils/logger/frontendLogger';

interface Props {
    boundaryName?: string;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });
        const message: string = `ErrorBoundary${this.props.boundaryName ? ' i ' + this.props.boundaryName : ''}`;
        logError(error, message, { reactInfo: info });
    }

    render() {
        if (this.state.hasError) {
            return (
                <AlertStripe type={'advarsel'}>Beklager, det skjedde en feil. ({this.props.boundaryName})</AlertStripe>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
