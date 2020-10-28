import React from 'react';
import './App.less';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';

const App = () => (
    <Router>
        <Layout>
            <ErrorBoundary>
                <Switch>
                    {routesConfig.map(route => {
                        return <Route key={route.path} {...route} exact />;
                    })}
                </Switch>
            </ErrorBoundary>
        </Layout>
    </Router>
);

export default withRouter(App);
