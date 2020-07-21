import React from 'react';
import PageTitle from './pageTitle';
import { ContentContainer, MasterPaddingContainer } from '../../styled-components/main-styled-components';
import {useSelector} from "react-redux";
import {Store} from "../../store/reducer";

const Layout = (props: any) => {
    const { chosenYtelse } = useSelector((state: Store) => state);
    const ytelse = chosenYtelse === 'engangsstonad' ? 'engangsstønad' : chosenYtelse;
    const title = `Klage på vedtak for ${ytelse}`;

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
