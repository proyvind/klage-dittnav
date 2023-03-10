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
import { EttersendelsePage } from '../components/ettersendelse/ettersendelse-page';
import { KlagebegrunnelsePage } from '../components/klage/innlogget/begrunnelse/klage-begrunnelse-page';
import { KlageinnsendingPage } from '../components/klage/innlogget/innsending/klage-innsending-page';
import { KlagekvitteringPage } from '../components/klage/innlogget/kvittering/klage-kvittering-page';
import { KlageoppsummeringPage } from '../components/klage/innlogget/summary/klage-oppsummering-page';
import { SessionKlagebegrunnelsePage } from '../components/klage/uinnlogget/begrunnelse/klage-begrunnelse-page';
import { SessionKlageinnsendingPage } from '../components/klage/uinnlogget/innsending/klage-innsending-page';
import { SessionKlageoppsummeringPage } from '../components/klage/uinnlogget/summary/klage-oppsummering-page';
import { ENVIRONMENT } from '../environment/environment';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { INNGANG_KATEGORIER } from '../kategorier/kategorier';
import { LanguageComponent } from '../language/component';
import { Languages } from '../language/types';
import { CreateAnke } from './create-anke/create-anke';
import { CreateKlage } from './create-klage/create-klage';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { InngangInnsending } from './inngang/inngang-innsendingsvalg';
import { InngangKategorier } from './inngang/inngang-kategorier';
import { LandingPage } from './landing-page';
import { NavigationLogger } from './navigation-logger';
import { NotFoundPage } from './not-found-page';
import { QueryParamsHandler } from './query-params-handler';
import { LoginIfUnauthorized, UpgradeSession } from './redirects';
import { SentryFallback } from './sentry-fallback';

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const Router = () => (
  <BrowserRouter>
    <NavigationLogger>
      <DekoratorSetRedirect>
        <LanguageComponent>
          <ErrorBoundary fallback={SentryFallback}>
            <SentryRoutes>
              <Route path="/:lang" element={<UpgradeSession />}>
                <Route index element={<LandingPage />} />

                <Route path="ny">
                  <Route index element={<QueryParamsHandler type="klage" />} />
                  {getCaseRoutes({ component: CreateKlage })}
                </Route>

                {innsendingsRoutes}
                {kategoriRoutes}

                <Route path="klage">
                  <Route path="ny">
                    <Route index element={<QueryParamsHandler type="klage" />} />
                    {getCaseRoutes({ component: CreateKlage })}
                  </Route>

                  <Route path="uinnlogget">
                    {getCaseRoutes({ component: SessionKlagebegrunnelsePage, pathSuffix: 'begrunnelse' })}
                    {getCaseRoutes({ component: SessionKlageoppsummeringPage, pathSuffix: 'oppsummering' })}
                    {getCaseRoutes({ component: SessionKlageinnsendingPage, pathSuffix: 'innsending' })}
                  </Route>

                  <Route path=":klageId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<KlagebegrunnelsePage />} />
                    <Route path="oppsummering" element={<KlageoppsummeringPage />} />
                    <Route path="kvittering" element={<KlagekvitteringPage />} />
                    <Route path="innsending" element={<KlageinnsendingPage />} />
                  </Route>
                </Route>

                <Route path="anke">
                  <Route path="ny">
                    <Route index element={<QueryParamsHandler type="anke" />} />
                    {getCaseRoutes({ component: CreateAnke })}
                  </Route>

                  <Route path="uinnlogget">
                    {getCaseRoutes({ component: SessionAnkebegrunnelsePage, pathSuffix: 'begrunnelse' })}
                    {getCaseRoutes({ component: SessionAnkeoppsummeringPage, pathSuffix: 'oppsummering' })}
                    {getCaseRoutes({ component: SessionAnkeinnsendingPage, pathSuffix: 'innsending' })}
                  </Route>

                  <Route path=":ankeId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<AnkebegrunnelsePage />} />
                    <Route path="oppsummering" element={<AnkeoppsummeringPage />} />
                    <Route path="kvittering" element={<AnkekvitteringPage />} />
                    <Route path="innsending" element={<AnkeinnsendingPage />} />
                  </Route>
                </Route>
              </Route>
              <Route
                index
                element={<Navigate to={`/${Languages.nb}${location.pathname}${location.search}${location.hash}`} />}
              />
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
    const kategoriPath = `${inngangkategori.path}/${kategori.path}`;
    const supportsDigitalKlage = kategori.digitalKlage.includes(ENVIRONMENT.environment);
    const supportsDigitalAnke = kategori.digitalAnke.includes(ENVIRONMENT.environment);

    return (
      <React.Fragment key={kategoriPath}>
        <Route
          path={kategoriPath}
          element={
            <InngangInnsending
              {...kategori}
              inngangkategori={inngangkategori}
              supportsDigitalKlage={supportsDigitalKlage}
              supportsDigitalAnke={supportsDigitalAnke}
            />
          }
        />
        <Route
          path={`ettersendelse/${kategori.innsendingsytelse}`}
          element={<EttersendelsePage innsendingsytelse={kategori.innsendingsytelse} />}
        />
      </React.Fragment>
    );
  })
);

interface YtelseComponentProps {
  innsendingsytelse: Innsendingsytelse;
}

type YtelseComponent = (props: YtelseComponentProps) => JSX.Element;

interface Props {
  component: YtelseComponent;
  pathSuffix?: string | null;
}

const getCaseRoutes = ({ component: Component, pathSuffix = null }: Props): JSX.Element[] =>
  INNGANG_KATEGORIER.flatMap((inngangkategori) =>
    inngangkategori.kategorier.map((kategori) => {
      if (pathSuffix === null) {
        return (
          <Route
            key={kategori.innsendingsytelse}
            path={kategori.innsendingsytelse}
            element={<Component innsendingsytelse={kategori.innsendingsytelse} />}
          />
        );
      }

      return (
        <Route key={kategori.innsendingsytelse} path={kategori.innsendingsytelse}>
          <Route path={pathSuffix} element={<Component innsendingsytelse={kategori.innsendingsytelse} />} />
        </Route>
      );
    })
  );
