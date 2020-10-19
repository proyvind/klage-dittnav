import React from 'react';
import './App.less';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';
import { withRouter } from 'react-router-dom';

const App = () => (
    <Router>
        <Layout>
            <Switch>
                {routesConfig.map((route, index) => {
                    return <Route key={index} {...route} />;
                })}
            </Switch>
        </Layout>
    </Router>
);

export default withRouter(App);
