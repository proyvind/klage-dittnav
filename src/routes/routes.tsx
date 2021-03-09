import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from '../error-boundry/ErrorBoundary';
import UserLoader from '../user/user-loader';
import CreateKlage from './create-klage';
import { ENVIRONMENT, LOGGED_IN_PATH } from '../environment/environment';
import Begrunnelse from './klageskjema/begrunnelse/begrunnelse';
import FormContainer from './klageskjema/form-container';
import KlageLoader from '../klage/klage-loader';
import Oppsummering from './klageskjema/summary/summary';
import KvitteringPage from './klageskjema/kvittering/kvittering-page';
import { InngangKategori, INNGANG_KATEGORIER, Kategori } from '../kategorier/kategorier';
import AppContextComponenet from '../app-context/app-context';
import { Klage } from '../klage/klage';
import { loggedInRedirect } from './loggedin-redirect';
import NotFoundPage from './not-found-page';
import RootWithQuery from './root-with-query';
import InngangKategorier from './inngang/inngang-kategorier';
import InngangInnsendingDigital from './inngang/inngang-innsendingsvalg-digital';
import InngangInnsendingPost from './inngang/inngang-innsendingsvalg-post';
import InngangFullmakt from './inngang/inngang-fullmakt';
import { Languages, LANGUAGE_KEYS } from '../language/language';
import LanguageComponenet from '../language/component';

const languagePath = `/:lang(${LANGUAGE_KEYS.join('|')})`;

const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <LanguageComponenet>
                <AppContextComponenet>
                    <ErrorBoundary>
                        <Switch>
                            <Route path={`${languagePath}/ny`} exact>
                                <UserLoader>
                                    <CreateKlage />
                                </UserLoader>
                            </Route>
                            <Route path={LOGGED_IN_PATH} render={loggedInRedirect} exact />
                            {innsendingsRoutes}
                            {kategoriRoutes}
                            {fullmaktRoutes}
                            <Route path={`${languagePath}/:klageId/begrunnelse`} render={begrunnelse} exact />
                            <Route path={`${languagePath}/:klageId/oppsummering`} render={oppsummering} exact />
                            <Route path={`${languagePath}/:klageId/kvittering`} render={kvittering} exact />
                            <Route path={languagePath} component={RootWithQuery} exact />
                            <Redirect path="/" to={`/${Languages.nb}`} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </ErrorBoundary>
                </AppContextComponenet>
            </LanguageComponenet>
        </BrowserRouter>
    </React.StrictMode>
);

const kategoriRoutes = INNGANG_KATEGORIER.map(inngangkategori => (
    <Route
        key={inngangkategori.path}
        path={`${languagePath}/${inngangkategori.path}`}
        render={() => <InngangKategorier inngangkategori={inngangkategori} />}
        exact
    />
));

const innsendingsRoutes = INNGANG_KATEGORIER.flatMap(inngangkategori =>
    inngangkategori.kategorier.map(kategori => {
        const path = `${languagePath}/${inngangkategori.path}/${kategori.path}`;
        return (
            <Route
                key={path}
                path={path}
                render={() => getInngangInnsendingComponent(inngangkategori, kategori)}
                exact
            />
        );
    })
);

const fullmaktRoutes = INNGANG_KATEGORIER.flatMap(inngangkategori =>
    inngangkategori.kategorier.map(kategori => {
        const path = `${languagePath}/${inngangkategori.path}/${kategori.path}/fullmakt`;
        return (
            <Route
                key={path}
                path={path}
                render={() => (
                    <UserLoader>
                        <InngangFullmakt inngangkategori={inngangkategori} kategori={kategori} />
                    </UserLoader>
                )}
                exact
            />
        );
    })
);

function getInngangInnsendingComponent(inngangkategori: InngangKategori, kategori: Kategori) {
    const { digitalKlage, digitalKlageFullmakt, titleKey, temaKey, allowsAnke, mailKlageUrl, mailAnkeUrl } = kategori;
    if (digitalKlage.includes(ENVIRONMENT.environment)) {
        return (
            <InngangInnsendingDigital
                temaKey={temaKey}
                titleKey={titleKey}
                ytelse={null}
                inngangkategori={inngangkategori}
                digitalKlageFullmakt={digitalKlageFullmakt}
                allowsAnke={allowsAnke}
                mailKlageUrl={mailKlageUrl}
                mailAnkeUrl={mailAnkeUrl}
            />
        );
    }
    return (
        <InngangInnsendingPost
            temaKey={temaKey}
            titleKey={titleKey}
            inngangkategori={inngangkategori}
            allowsAnke={allowsAnke}
            mailKlageUrl={mailKlageUrl}
            mailAnkeUrl={mailAnkeUrl}
        />
    );
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
