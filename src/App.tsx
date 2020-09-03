import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { getTemaObject } from './services/klageService';
import { useDispatch } from 'react-redux';
import { setValgtYtelse } from './store/actions';
import NotFoundPage from './pages/not-found/not-found-page';

const App = (props: any) => {
    const [errorState, setErrorState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('using effect...');
        if (props.location.search !== '') {
            const query = queryString.parse(props.location.search);
            if (query) {
                if (query.tema && !Array.isArray(query.tema)) {
                    getTemaObject(query.tema)
                        .then(res => {
                            let ytelse = '';
                            ytelse = query.ytelse && !Array.isArray(query.ytelse) ? query.ytelse : res.value;
                            dispatch(setValgtYtelse(ytelse));
                        })
                        .catch(err => {
                            if (err.response?.status === 404) {
                                setErrorState(true);
                                return;
                            }
                            console.log(err);
                        });
                }
            }
        }
    }, [dispatch, props.location.search]);

    if (errorState) {
        return <NotFoundPage />;
    }
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

export default withRouter(App);
