import { ErrorBoundary, withSentryReactRouterV6Routing } from '@sentry/react';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AnkebegrunnelsePage } from '../components/anke/innlogget/begrunnelse/anke-begrunnelse-page';
import { AnkeinnsendingPage } from '../components/anke/innlogget/innsending/anke-innsending-page';
import { AnkekvitteringPage } from '../components/anke/innlogget/kvittering/anke-kvittering-page';
import { AnkeoppsummeringPage } from '../components/anke/innlogget/summary/anke-oppsummering-page';
import { SessionAnkebegrunnelsePage } from '../components/anke/uinnlogget/begrunnelse/anke-begrunnelse-page';
import { SessionAnkeinnsendingPage } from '../components/anke/uinnlogget/innsending/anke-innsending-page';
import { SessionAnkeoppsummeringPage } from '../components/anke/uinnlogget/summary/anke-oppsummering-page';
import { KlagebegrunnelsePage } from '../components/klage/innlogget/begrunnelse/klage-begrunnelse-page';
import { KlageinnsendingPage } from '../components/klage/innlogget/innsending/klage-innsending-page';
import { KlagekvitteringPage } from '../components/klage/innlogget/kvittering/klage-kvittering-page';
import { KlageoppsummeringPage } from '../components/klage/innlogget/summary/klage-oppsummering-page';
import { SessionKlagebegrunnelsePage } from '../components/klage/uinnlogget/begrunnelse/klage-begrunnelse-page';
import { SessionKlageinnsendingPage } from '../components/klage/uinnlogget/innsending/klage-innsending-page';
import { SessionKlageoppsummeringPage } from '../components/klage/uinnlogget/summary/klage-oppsummering-page';
import { ENVIRONMENT } from '../environment/environment';
import { INNGANG_KATEGORIER } from '../kategorier/kategorier';
import { LanguageComponent } from '../language/component';
import { Languages } from '../language/types';
import { CreateAnke } from './create-anke';
import { CreateKlage } from './create-klage';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { InngangInnsending } from './inngang/inngang-innsendingsvalg';
import { InngangKategorier } from './inngang/inngang-kategorier';
import { NavigationLogger } from './navigation-logger';
import { NotFoundPage } from './not-found-page';
import { LoginIfUnauthorized, RedirectIfAuthorized, UpgradeSession } from './redirects';
import { RootWithQuery } from './root-with-query';
import { SentryFallback } from './sentry-fallback';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const Router = () => (
  <BrowserRouter>
    <NavigationLogger>
      <DekoratorSetRedirect>
        <LanguageComponent>
          <ErrorBoundary fallback={SentryFallback}>
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
          </ErrorBoundary>
        </LanguageComponent>
      </DekoratorSetRedirect>
    </NavigationLogger>
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
