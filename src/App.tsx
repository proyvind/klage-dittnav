import React, { useEffect, useState } from 'react';
import './App.less';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [errorState, setErrorState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.location.search !== '') {
            const query = queryString.parse(props.location.search);

            if (sessionStorage.getItem('nav.klage.klageId') && query && !query.klageid) {
                if (query.tema) {
                    let cachedTema = sessionStorage.getItem('nav.klage.tema');
                    let cachedYtelse = sessionStorage.getItem('nav.klage.ytelse');
                    if (cachedTema === query.tema) {
                        if (
                            cachedYtelse === query.ytelse ||
                            (query.ytelse === undefined && cachedYtelse === Tema[cachedTema])
                        ) {
                            if (query.saksnummer || sessionStorage.getItem('nav.klage.saksnr')) {
                                if (query.saksnummer === sessionStorage.getItem('nav.klage.saksnr')) {
                                    dispatch(setKlageId(sessionStorage.getItem('nav.klage.klageId') as string));
                                } else {
                                    sessionStorage.removeItem('nav.klage.saksnr');
                                }
                            } else {
                                dispatch(setKlageId(sessionStorage.getItem('nav.klage.klageId') as string));
                            }
                        }
                    }
                } else {
                    dispatch(setKlageId(sessionStorage.getItem('nav.klage.klageId') as string));
                }
                setLoading(false);
            }

            if (query && query.tema) {
                const tema = query.tema.toString();
                dispatch(setValgtTema(tema));
                getTemaObject(tema)
                    .then(res => {
                        const ytelse = query.ytelse ? String(query.ytelse) : res.value;
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
    }, [dispatch, props.location.search, props.chosenYtelse]);

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
