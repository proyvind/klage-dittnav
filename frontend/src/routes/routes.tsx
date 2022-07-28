import { Alert, BodyShort } from '@navikt/ds-react';
import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { ENVIRONMENT } from '../environment/environment';
import { INNGANG_KATEGORIER } from '../kategorier/kategorier';
import { LanguageComponent } from '../language/component';
import { Languages } from '../language/types';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { LoginIfUnauthorized, RedirectIfAuthorized, UpgradeSession } from './redirects';

const AnkebegrunnelsePage = lazy(() => import('../components/anke/innlogget/begrunnelse/anke-begrunnelse-page'));
const AnkeinnsendingPage = lazy(() => import('../components/anke/innlogget/innsending/anke-innsending-page'));
const AnkekvitteringPage = lazy(() => import('../components/anke/innlogget/kvittering/anke-kvittering-page'));
const AnkeoppsummeringPage = lazy(() => import('../components/anke/innlogget/summary/anke-oppsummering-page'));
const SessionAnkebegrunnelsePage = lazy(
  () => import('../components/anke/uinnlogget/begrunnelse/anke-begrunnelse-page')
);
const SessionAnkeinnsendingPage = lazy(() => import('../components/anke/uinnlogget/innsending/anke-innsending-page'));
const SessionAnkeoppsummeringPage = lazy(() => import('../components/anke/uinnlogget/summary/anke-oppsummering-page'));
const KlagebegrunnelsePage = lazy(() => import('../components/klage/innlogget/begrunnelse/klage-begrunnelse-page'));
const KlageinnsendingPage = lazy(() => import('../components/klage/innlogget/innsending/klage-innsending-page'));
const KlagekvitteringPage = lazy(() => import('../components/klage/innlogget/kvittering/klage-kvittering-page'));
const KlageoppsummeringPage = lazy(() => import('../components/klage/innlogget/summary/klage-oppsummering-page'));
const SessionKlagebegrunnelsePage = lazy(
  () => import('../components/klage/uinnlogget/begrunnelse/klage-begrunnelse-page')
);
const SessionKlageinnsendingPage = lazy(
  () => import('../components/klage/uinnlogget/innsending/klage-innsending-page')
);
const SessionKlageoppsummeringPage = lazy(
  () => import('../components/klage/uinnlogget/summary/klage-oppsummering-page')
);
const CreateAnke = lazy(() => import('./create-anke'));
const CreateKlage = lazy(() => import('./create-klage'));
const InngangInnsending = lazy(() => import('./inngang/inngang-innsendingsvalg'));
const InngangKategorier = lazy(() => import('./inngang/inngang-kategorier'));
const NotFoundPage = lazy(() => import('./not-found-page'));
const RootWithQuery = lazy(() => import('./root-with-query'));

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const Router = () => (
  <BrowserRouter>
    <DekoratorSetRedirect>
      <LanguageComponent>
        <ErrorBoundary
          fallback={
            <Alert variant="warning">
              <BodyShort>Beklager, det skjedde en feil.</BodyShort>
              <BodyShort>Sorry, something went wrong.</BodyShort>
            </Alert>
          }
        >
          <Suspense fallback={<LoadingPage />}>
            <SentryRoutes>
              <Route path="ny" element={<CreateKlage />} />
              <Route path="/:lang" element={<UpgradeSession />}>
                {innsendingsRoutes}
                {kategoriRoutes}

                <Route path="klage">
                  <Route path="ny" element={<CreateKlage />} />

                  <Route path="uinnlogget" element={<RedirectIfAuthorized type="klage" />}>
                    <Route path=":temaKey/:titleKey">
                      <Route path="begrunnelse" element={<SessionKlagebegrunnelsePage />} />
                      <Route path="oppsummering" element={<SessionKlageoppsummeringPage />} />
                      <Route path="innsending" element={<SessionKlageinnsendingPage />} />
                    </Route>
                  </Route>

                  <Route path=":klageId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<KlagebegrunnelsePage />} />
                    <Route path="oppsummering" element={<KlageoppsummeringPage />} />
                    <Route path="kvittering" element={<KlagekvitteringPage />} />
                    <Route path="innsending" element={<KlageinnsendingPage />} />
                  </Route>
                </Route>

                <Route path="anke">
                  <Route path="ny" element={<CreateAnke />} />

                  <Route path="uinnlogget" element={<RedirectIfAuthorized type="anke" />}>
                    <Route path=":temaKey/:titleKey">
                      <Route path="begrunnelse" element={<SessionAnkebegrunnelsePage />} />
                      <Route path="oppsummering" element={<SessionAnkeoppsummeringPage />} />
                      <Route path="innsending" element={<SessionAnkeinnsendingPage />} />
                    </Route>
                  </Route>

                  <Route path=":ankeId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<AnkebegrunnelsePage />} />
                    <Route path="oppsummering" element={<AnkeoppsummeringPage />} />
                    <Route path="kvittering" element={<AnkekvitteringPage />} />
                    <Route path="innsending" element={<AnkeinnsendingPage />} />
                  </Route>
                </Route>

                <Route path="" element={<RootWithQuery />} />
                <Route path="" element={<Navigate to={`/${Languages.nb}`} />} />
              </Route>
              <Route path="/" element={<Navigate to={`/${Languages.nb}`} />} />
              <Route path="*" element={<NotFoundPage />} />
            </SentryRoutes>
          </Suspense>
        </ErrorBoundary>
      </LanguageComponent>
    </DekoratorSetRedirect>
  </BrowserRouter>
);

const kategoriRoutes = INNGANG_KATEGORIER.map((inngangkategori) => (
  <Route
    key={inngangkategori.path}
    path={inngangkategori.path}
    element={<InngangKategorier inngangkategori={inngangkategori} />}
  />
));

const innsendingsRoutes = INNGANG_KATEGORIER.flatMap((inngangkategori) =>
  inngangkategori.kategorier.map((kategori) => {
    const path = `${inngangkategori.path}/${kategori.path}`;

    return (
      <Route
        key={path}
        path={path}
        element={
          <InngangInnsending
            {...kategori}
            inngangkategori={inngangkategori}
            supportsDigitalKlage={kategori.digitalKlage.includes(ENVIRONMENT.environment)}
            supportsDigitalAnke={kategori.digitalAnke.includes(ENVIRONMENT.environment)}
          />
        }
      />
    );
  })
);
