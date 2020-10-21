import React from 'react';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import FormLanding from '../../components/form-landing/form-landing';

const FormLandingPage = () => (
    <ErrorBoundary>
        <FormLanding />
    </ErrorBoundary>
);

export default FormLandingPage;
