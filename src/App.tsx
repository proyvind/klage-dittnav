import React, { useEffect, useState } from 'react';
import './App.less';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { getTemaObject } from './services/klageService';
import { useDispatch } from 'react-redux';
import { setValgtYtelse, setValgtTema, setKlageId } from './store/actions';
import NotFoundPage from './pages/not-found/not-found-page';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from './styled-components/main-styled-components';
import { Tema } from './types/tema';

const App = (props: RouteComponentProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [errorState, setErrorState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.location.search !== '') {
            const query = queryString.parse(props.location.search);
            const cachedKlageId = sessionStorage.getItem('nav.klage.klageId');

            if (cachedKlageId && query && !query.klageid) {
                if (query.tema) {
                    const cachedTema = sessionStorage.getItem('nav.klage.tema');
                    const cachedYtelse = sessionStorage.getItem('nav.klage.ytelse');
                    if (cachedTema === query.tema) {
                        if (
                            cachedYtelse === query.ytelse ||
                            (query.ytelse === undefined && cachedYtelse === Tema[cachedTema])
                        ) {
                            if (query.saksnummer || sessionStorage.getItem('nav.klage.saksnr')) {
                                if (query.saksnummer === sessionStorage.getItem('nav.klage.saksnr')) {
                                    dispatch(setKlageId(cachedKlageId));
                                } else {
                                    sessionStorage.removeItem('nav.klage.saksnr');
                                }
                            } else {
                                dispatch(setKlageId(cachedKlageId));
                            }
                        }
                    }
                } else {
                    dispatch(setKlageId(cachedKlageId));
                }
                setLoading(false);
            }

            const tema = query.tema;
            if (query && typeof tema === 'string' && tema.length !== 0) {
                dispatch(setValgtTema(tema));
                getTemaObject(tema)
                    .then(temaObject => {
                        const ytelse = query.ytelse ? String(query.ytelse) : temaObject.value;
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
