import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';
import UserLoader from './components/user-loader/user-loader';
import CreateKlage from './pages/create-klage/create-klage';
import RootWithQuery from './pages/root-with-query/root-with-query';
import NotFoundPage from './pages/not-found/not-found-page';
import { LOGGED_IN_PATH } from './utils/environment';
import { loggedInRedirect } from './pages/loggedin-redirect/loggedin-redirect';
import Begrunnelse from './components/begrunnelse/begrunnelse';
import FormContainer from './components/form-container/form-container';
import KlageLoader from './components/klage-loader/klage-loader';
import Oppsummering from './pages/oppsummering/oppsummering';
import KvitteringPage from './pages/kvittering/kvittering-page';
import InngangKategorier from './components/inngang/inngang-kategorier';
import { INNGANG_KATEGORIER, Kategori } from './data/kategorier';
import InngangInnsendingDigital from './components/inngang/inngang-innsendingsvalg-digital';
import InngangInnsendingPost from './components/inngang/inngang-innsendingsvalg-post';
import EnvironmentLoader from './components/environment-loader/environment-loader';
import AppContextComponenet from './components/app-context/app-context';
import { MainContainer } from './styled-components/main-styled-components';
import { Klage } from './types/klage';

const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <AppContextComponenet>
                <MainContainer>
                    <ErrorBoundary>
                        <EnvironmentLoader>
                            <Switch>
                                {innsendingsRoutes}
                                {kategoriRoutes}
                                <Route path={'/ny'} exact>
                                    <UserLoader>
                                        <CreateKlage />
                                    </UserLoader>
                                </Route>
                                <Route path={LOGGED_IN_PATH} render={loggedInRedirect} exact />
                                <Route path={'/:klageId/begrunnelse'} render={begrunnelse} exact />
                                <Route path={'/:klageId/oppsummering'} render={oppsummering} exact />
                                <Route path={'/:klageId/kvittering'} render={kvittering} exact />
                                <Route path={'/'} component={RootWithQuery} exact />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </EnvironmentLoader>
                    </ErrorBoundary>
                </MainContainer>
            </AppContextComponenet>
        </BrowserRouter>
    </React.StrictMode>
);

const kategoriRoutes = INNGANG_KATEGORIER.map(inngangkategori => (
    <Route
        key={inngangkategori.path}
        path={`/${inngangkategori.path}`}
        render={() => <InngangKategorier inngangkategori={inngangkategori} />}
        exact
    />
));

const innsendingsRoutes = INNGANG_KATEGORIER.flatMap(inngangkategori =>
    inngangkategori.kategorier.map(kategori => {
        const path = `/${inngangkategori.path}/${kategori.path}`;
        return <Route key={path} path={path} render={() => getInngangInnsendingComponent(kategori)} exact />;
    })
);

function getInngangInnsendingComponent({ digital, title, temaKey }: Kategori) {
    if (digital) {
        return <InngangInnsendingDigital temaKey={temaKey} title={title} />;
    }
    return <InngangInnsendingPost temaKey={temaKey} title={title} />;
}

const renderBegrunnelse = (klage: Klage) => <FormContainer klage={klage} activeStep={0} render={Begrunnelse} />;
const begrunnelse = () => (
    <UserLoader>
        <KlageLoader render={renderBegrunnelse} />
    </UserLoader>
);

const renderOppsummering = (klage: Klage) => <FormContainer klage={klage} activeStep={1} render={Oppsummering} />;
const oppsummering = () => (
    <UserLoader>
        <KlageLoader render={renderOppsummering} />
    </UserLoader>
);

const renderKvittering = (klage: Klage) => <FormContainer klage={klage} activeStep={2} render={KvitteringPage} />;
const kvittering = () => (
    <UserLoader>
        <KlageLoader render={renderKvittering} />
    </UserLoader>
);

export default App;
