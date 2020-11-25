import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from '../error-boundry/ErrorBoundary';
import UserLoader from '../user/user-loader';
import CreateKlage from './create-klage';
import { LOGGED_IN_PATH } from '../environment/environment';
import Begrunnelse from './klageskjema/begrunnelse/begrunnelse';
import FormContainer from './klageskjema/form-container';
import KlageLoader from '../klage/klage-loader';
import Oppsummering from './klageskjema/oppsummering';
import KvitteringPage from './klageskjema/kvittering/kvittering-page';
import { INNGANG_KATEGORIER, Kategori } from '../kategorier/kategorier';
import AppContextComponenet from '../app-context/app-context';
import { Klage } from '../klage/klage';
import { loggedInRedirect } from './loggedin-redirect';
import NotFoundPage from './not-found-page';
import RootWithQuery from './root-with-query';
import InngangKategorier from './inngang/inngang-kategorier';
import InngangInnsendingDigital from './inngang/inngang-innsendingsvalg-digital';
import InngangInnsendingPost from './inngang/inngang-innsendingsvalg-post';

const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <AppContextComponenet>
                <ErrorBoundary>
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
                </ErrorBoundary>
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
