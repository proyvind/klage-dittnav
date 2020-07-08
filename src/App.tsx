import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    {routesConfig.map(route => {
                        return <Route key={route.path} {...route} />;
                    })}
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
