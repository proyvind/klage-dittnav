import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import PageTitle from './components/klage-frontpage/pageTitle';
import { ContentContainer, MasterPaddingContainer } from './styled-components/main-styled-components';
import NotFoundPage from './pages/not-found/not-found-page';

const Layout = (props: any) => {
    const TITLE = 'Klage på vedtak';
    return (
        <>
            <PageTitle title={TITLE} />

            <ContentContainer>
                <MasterPaddingContainer>{props.children}</MasterPaddingContainer>
            </ContentContainer>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    {routesConfig.map(route => {
                        return <Route key={route.path} {...route} />;
                    })}
                    <Route component={NotFoundPage} />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
