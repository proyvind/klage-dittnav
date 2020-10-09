import React from 'react';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { useLogPageView } from '../../utils/logger/use-log-page-view';

const NotFoundPage = () => {
    useLogPageView(PageIdentifier.NOT_FOUND);
    return <h1>404 Finner ikke siden</h1>;
};

export default NotFoundPage;
