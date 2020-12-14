import React from 'react';
import { useTranslation } from '../language/use-translation';
import { PageIdentifier } from '../logging/amplitude';
import { useLogPageView } from '../logging/use-log-page-view';

interface Props {
    message?: string | null;
}

const NotFoundPage = ({ message = null }: Props) => {
    useLogPageView(PageIdentifier.NOT_FOUND);
    const { not_found_page } = useTranslation();
    if (message === null) {
        return <h1>{not_found_page.title}</h1>;
    }
    return <h1>{message}</h1>;
};

export default NotFoundPage;
