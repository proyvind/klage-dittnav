import React from 'react';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import FormLanding from '../../components/form-landing/form-landing';
import queryString from 'query-string';

const FormLandingPage = (props: any) => {
    const query = queryString.parse(props.location.search);

    return (
        <ErrorBoundary>
            <FormLanding query={query} />
        </ErrorBoundary>
    );
};

export default FormLandingPage;
