import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import PageTitle from './components/klage-frontpage/pageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducer';
import { checkAuth } from './store/actions';
import { ContentContainer, PaddingContainer } from './styled-components/main-styled-components';
import NotFoundPage from './pages/not-found/not-found-page';

const Layout = (props: any) => {
    const TITLE = 'Klage på vedtak';
    return (
        <>
            <PageTitle title={TITLE} />

            <ContentContainer>
                <PaddingContainer>{props.children}</PaddingContainer>
            </ContentContainer>
        </>
    );
};

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: Store) => state);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        // Just an example :)
        return <h1>Loading</h1>;
    }

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
