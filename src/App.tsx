import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Steps from './components/steps/steps';
import { routesConfig } from './utils/routes.config';
import PageTitle from './components/klage-frontpage/pageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducer';
import { checkAuth } from './store/actions';
import { MarginContentContainer, CenteredContentContainer } from './styled-components/main-styled-components';
import NotFoundPage from './pages/not-found/not-found-page';
import { Systemtittel } from 'nav-frontend-typografi';
import { useLocation } from 'react-router-dom';

const Layout = (props: any) => {
    const TITLE = 'Klage på vedtak';
    const LOCATION = useLocation();
    return (
        <div>
            <PageTitle title={TITLE} />
            <MarginContentContainer>
                <Steps />
            </MarginContentContainer>
            <MarginContentContainer>
                <CenteredContentContainer>
                    <Systemtittel>{routesConfig.find(route => route.path === LOCATION.pathname)?.label}</Systemtittel>
                </CenteredContentContainer>
            </MarginContentContainer>
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
                <MarginContentContainer>
                    <Switch>
                        {routesConfig.map(route => {
                            return <Route exact={true} key={route.path} {...route} />;
                        })}
                        <Route component={NotFoundPage} />
                    </Switch>
                </MarginContentContainer>
            </Layout>
        </Router>
    );
};

export default App;
