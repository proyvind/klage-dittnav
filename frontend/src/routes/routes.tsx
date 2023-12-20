import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AnkebegrunnelsePage } from '@app/components/anke/innlogget/begrunnelse/anke-begrunnelse-page';
import { AnkeinnsendingPage } from '@app/components/anke/innlogget/innsending/anke-innsending-page';
import { AnkekvitteringPage } from '@app/components/anke/innlogget/kvittering/anke-kvittering-page';
import { AnkeoppsummeringPage } from '@app/components/anke/innlogget/summary/anke-oppsummering-page';
import { SessionAnkebegrunnelsePage } from '@app/components/anke/uinnlogget/begrunnelse/anke-begrunnelse-page';
import { SessionAnkeinnsendingPage } from '@app/components/anke/uinnlogget/innsending/anke-innsending-page';
import { SessionAnkeoppsummeringPage } from '@app/components/anke/uinnlogget/summary/anke-oppsummering-page';
import { EttersendelsePage } from '@app/components/ettersendelse/ettersendelse-page';
import { KlagebegrunnelsePage } from '@app/components/klage/innlogget/begrunnelse/klage-begrunnelse-page';
import { KlageinnsendingPage } from '@app/components/klage/innlogget/innsending/klage-innsending-page';
import { KlagekvitteringPage } from '@app/components/klage/innlogget/kvittering/klage-kvittering-page';
import { KlageoppsummeringPage } from '@app/components/klage/innlogget/summary/klage-oppsummering-page';
import { SessionKlagebegrunnelsePage } from '@app/components/klage/uinnlogget/begrunnelse/klage-begrunnelse-page';
import { SessionKlageinnsendingPage } from '@app/components/klage/uinnlogget/innsending/klage-innsending-page';
import { SessionKlageoppsummeringPage } from '@app/components/klage/uinnlogget/summary/klage-oppsummering-page';
import { INNSENDINGSYTELSER, Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { LanguageComponent } from '@app/language/component';
import { Languages } from '@app/language/types';
import { CreateAnke } from './create-anke/create-anke';
import { CreateKlage } from './create-klage/create-klage';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { ErrorBoundary } from './error-boundary';
import { LandingPage } from './landing-page';
import { NavigationLogger } from './navigation-logger';
import { NotFoundPage } from './not-found-page';
import { QueryParamsHandler } from './query-params-handler';
import { LoginIfUnauthorized, UpgradeSession } from './redirects';

export const Router = () => (
  <BrowserRouter>
    <NavigationLogger>
      <DekoratorSetRedirect>
        <LanguageComponent>
          <ErrorBoundary>
            <Routes>
              <Route path="/:lang" element={<UpgradeSession />}>
                <Route index element={<LandingPage />} />

                <Route path="ny">
                  <Route index element={<QueryParamsHandler type="klage" />} />
                  {getCaseRoutes({ component: CreateKlage })}
                </Route>

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

                <Route path="ettersendelse">
                  {INNSENDINGSYTELSER.map((innsendingsytelse) => (
                    <Route
                      key={innsendingsytelse}
                      path={innsendingsytelse}
                      element={<EttersendelsePage innsendingsytelse={innsendingsytelse} />}
                    />
                  ))}
                </Route>
              </Route>

              <Route
                index
                element={<Navigate to={`/${Languages.nb}${location.pathname}${location.search}${location.hash}`} />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </LanguageComponent>
      </DekoratorSetRedirect>
    </NavigationLogger>
  </BrowserRouter>
);

interface YtelseComponentProps {
  innsendingsytelse: Innsendingsytelse;
}

type YtelseComponent = (props: YtelseComponentProps) => JSX.Element;

interface Props {
  component: YtelseComponent;
  pathSuffix?: string | null;
}

const getCaseRoutes = ({ component: Component, pathSuffix = null }: Props) =>
  INNSENDINGSYTELSER.map((innsendingsytelse) => {
    if (pathSuffix === null) {
      return (
        <Route
          key={innsendingsytelse}
          path={innsendingsytelse}
          element={<Component innsendingsytelse={innsendingsytelse} />}
        />
      );
    }

    return (
      <Route key={`${innsendingsytelse}/${pathSuffix}`} path={innsendingsytelse}>
        <Route path={pathSuffix} element={<Component innsendingsytelse={innsendingsytelse} />} />
      </Route>
    );
  });
