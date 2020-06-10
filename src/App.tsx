import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import PageTitle from './components/klage-frontpage/pageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducer';
import { checkAuth } from './store/actions';
import { MarginContainer } from './styled-components/main-styled-components';
import NotFoundPage from './pages/not-found/not-found-page';

const Layout = (props: any) => {
    const TITLE = 'Klage på vedtak';
    return (
        <div>
            <PageTitle title={TITLE} />
            {props.children}
        </div>
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
                <MarginContainer>
                    <Switch>
                        {routesConfig.map(route => {
                            return <Route key={route.path} {...route} />;
                        })}
                        <Route component={NotFoundPage} />
                    </Switch>
                </MarginContainer>
            </Layout>
        </Router>
    );
};

export default App;
