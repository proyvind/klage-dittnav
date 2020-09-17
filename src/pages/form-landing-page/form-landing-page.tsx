import React from 'react';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import FormLanding from '../../components/form-landing/form-landing';
import queryString from 'query-string';

interface Props {
    location: Location;
}

const FormLandingPage = (props: Props) => {
    const query = queryString.parse(props.location.search);
    const path = props.location.pathname;

    return (
        <ErrorBoundary>
            <FormLanding path={path} query={query} location={props.location} />
        </ErrorBoundary>
    );
};

export default FormLandingPage;
