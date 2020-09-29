import React, { useEffect, useState } from 'react';
import './App.less';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { routesConfig } from './utils/routes.config';
import Layout from './components/general/layout';
import { withRouter } from 'react-router-dom';
import { getReferrer, getTemaObject } from './services/klageService';
import { useDispatch } from 'react-redux';
import { setValgtYtelse, setValgtTema, setKlageId, postNewKlage, setStorageContent } from './store/actions';
import NotFoundPage from './pages/not-found/not-found-page';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from './styled-components/main-styled-components';
import { logError } from './utils/logger/frontendLogger';
import { getResumeState } from './utils/get-resume-state';
import { AxiosError } from 'axios';
import { KlageSkjema } from './types/klage';
import { DatoValg } from './components/begrunnelse/datoValg';

const App = (props: RouteComponentProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [errorState, setErrorState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const { klageId, tema, ytelse, saksnummer } = getResumeState(props.location.search, sessionStorage);
        setStorageContent(klageId, tema, ytelse, saksnummer);

        if (ytelse !== null) {
            dispatch(setValgtYtelse(ytelse));
        }
        if (tema !== null) {
            dispatch(setValgtTema(tema));
        }

        if (klageId !== null) {
            dispatch(setKlageId(klageId, tema, ytelse, saksnummer));
            setLoading(false);
        } else if (ytelse !== null && tema !== null) {
            const klageSkjema: KlageSkjema = {
                id: null,
                ytelse,
                tema,
                saksnummer: saksnummer,
                datoalternativ: DatoValg.INGEN,
                vedtak: null,
                fritekst: '',
                vedlegg: [],
                referrer: getReferrer()
            };
            dispatch(postNewKlage(klageSkjema));
            setLoading(false);
        } else if (tema !== null) {
            dispatch(setValgtTema(tema));
            getTemaObject(tema)
                .then(temaObject => {
                    dispatch(setValgtYtelse(ytelse ?? temaObject.value));
                    setLoading(false);
                })
                .catch((err: AxiosError) => {
                    if (err.response?.status === 404) {
                        setErrorState(true);
                        setLoading(false);
                        return;
                    }
                    logError(err);
                });
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
