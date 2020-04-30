import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Steps from './components/steps/steps';
import { routesConfig } from './utils/routes.config';
import PageTitle from './components/klage-frontpage/pageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducer';
import { checkAuth } from './store/actions';
import { MarginContentContainer, ContentContainer } from './styled-components/main-styled-components';
import NotFoundPage from './pages/not-found/not-found-page';
import { Innholdstittel } from 'nav-frontend-typografi';

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: Store) => state);
    const TITLE = 'Klage på vedtak';

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        // Just an example :)
        return <h1>Loading</h1>;
    }

    return (
        <Router>
            <PageTitle title={TITLE} />
            <MarginContentContainer>
                <Steps />
            </MarginContentContainer>

            <MarginContentContainer>
                <Switch>
                    {routesConfig.map(route => {
                        return (
                            <>
                                <MarginContentContainer>
                                    <ContentContainer>
                                        <Innholdstittel>{route.label}</Innholdstittel>
                                    </ContentContainer>
                                </MarginContentContainer>
                                <Route exact={true} key={route.path} {...route} />
                            </>
                        );
                    })}
                    <Route component={NotFoundPage} />
                </Switch>
            </MarginContentContainer>
        </Router>
    );
};

export default App;
