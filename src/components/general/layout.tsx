import React from 'react';
import PageTitle from '../klage-frontpage/pageTitle';
import { ContentContainer, MasterPaddingContainer } from '../../styled-components/main-styled-components';

const Layout = (props: any) => {
    let title = 'Klage';
    let ytelse = props.location.pathname.split('/')[1];

    if (ytelse) {
        if (props.location.pathname.split('/')[2]) {
            if (ytelse === 'engangsstonad') {
                ytelse = 'engangsstønad';
            }
            title += ' på vedtak for ' + ytelse;
        } else {
            title += ' skjemainngang';
        }
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
