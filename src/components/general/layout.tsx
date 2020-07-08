import React from 'react';
import PageTitle from '../klage-frontpage/pageTitle';
import { ContentContainer, MasterPaddingContainer } from '../../styled-components/main-styled-components';
import { isValidYtelse, defaultYtelse } from '../../utils/routes.config';

const Layout = (props: any) => {
    let title = 'Klage';

    let firsturlchild = window.location.pathname.split('/')[1];
    if (firsturlchild === '') {
        firsturlchild = defaultYtelse;
    }
    if (isValidYtelse(firsturlchild)) {
        let ytelse = firsturlchild;

        if (ytelse === 'engangsstonad') {
            ytelse = 'engangsstønad';
        }
        title += ' på vedtak for ' + ytelse;
    } else {
        title += ' skjemainngang';
    }

    return (
        <>
            <PageTitle title={title} />

            <ContentContainer>
                <MasterPaddingContainer>{props.children}</MasterPaddingContainer>
            </ContentContainer>
        </>
    );
};

export default Layout;
