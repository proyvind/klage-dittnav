import React from 'react';
import { PageIdentifier } from '../logging/amplitude';
import { useLogPageView } from '../logging/use-log-page-view';

interface Props {
    message?: string | null;
}

const NotFoundPage = ({ message = null }: Props) => {
    useLogPageView(PageIdentifier.NOT_FOUND);
    if (message === null) {
        return <h1>404 Finner ikke siden</h1>;
    }
    return <h1>{message}</h1>;
};

export default NotFoundPage;
