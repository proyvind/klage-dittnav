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
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from './styled-components/main-styled-components';

const App = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [errorState, setErrorState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.location.search !== '') {
            const query = queryString.parse(props.location.search);
            if (query) {
                if (query.tema && !Array.isArray(query.tema)) {
                    getTemaObject(query.tema)
                        .then(res => {
                            let ytelse = '';
                            ytelse = query.ytelse && !Array.isArray(query.ytelse) ? query.ytelse : res.value;
                            dispatch(setValgtYtelse(ytelse));
                            setLoading(false);
                        })
                        .catch(err => {
                            if (err.response?.status === 404) {
                                setErrorState(true);
                                setLoading(false);
                                return;
                            }
                            console.log(err);
                        });
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [dispatch, props.location.search]);

    if (loading) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
            </CenteredContainer>
        );
    } else {
        if (errorState) {
            return <NotFoundPage />;
        } else {
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
        }
    }
};

export default withRouter(App);
