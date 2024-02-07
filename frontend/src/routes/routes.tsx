import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { CreateAnke } from './create-anke/create-anke';
import { CreateKlage } from './create-klage/create-klage';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { ErrorBoundary } from './error-boundary';
import { NavigationLogger } from './navigation-logger';
import { NotFoundPage } from './not-found-page';
import { LoginIfUnauthorized, UpgradeSession } from './redirects';

export const Router = () => (
  <BrowserRouter>
    <NavigationLogger>
      <DekoratorSetRedirect>
        <LanguageComponent>
          <ErrorBoundary>
            <Routes>
              <Route path="/:lang" element={<UpgradeSession />}>
                <Route path="klage">
                  {getRoutes(CreateKlage)}

                  {getRoutesWithSuffix(SessionKlagebegrunnelsePage, 'begrunnelse')}
                  {getRoutesWithSuffix(SessionKlageoppsummeringPage, 'oppsummering')}
                  {getRoutesWithSuffix(SessionKlageinnsendingPage, 'innsending')}

                  <Route path=":klageId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<KlagebegrunnelsePage />} />
                    <Route path="oppsummering" element={<KlageoppsummeringPage />} />
                    <Route path="innsending" element={<KlageinnsendingPage />} />
                    <Route path="kvittering" element={<KlagekvitteringPage />} />
                  </Route>
                </Route>

                <Route path="anke">
                  {getRoutes(CreateAnke)}

                  {getRoutesWithSuffix(SessionAnkebegrunnelsePage, 'begrunnelse')}
                  {getRoutesWithSuffix(SessionAnkeoppsummeringPage, 'oppsummering')}
                  {getRoutesWithSuffix(SessionAnkeinnsendingPage, 'innsending')}

                  <Route path=":ankeId" element={<LoginIfUnauthorized />}>
                    <Route path="begrunnelse" element={<AnkebegrunnelsePage />} />
                    <Route path="oppsummering" element={<AnkeoppsummeringPage />} />
                    <Route path="innsending" element={<AnkeinnsendingPage />} />
                    <Route path="kvittering" element={<AnkekvitteringPage />} />
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

const getRoutes = (Component: YtelseComponent) =>
  INNSENDINGSYTELSER.map((innsendingsytelse) => (
    <Route
      index
      key={innsendingsytelse}
      path={innsendingsytelse}
      element={<Component innsendingsytelse={innsendingsytelse} />}
    />
  ));

const getRoutesWithSuffix = (Component: YtelseComponent, pathSuffix: string) =>
  INNSENDINGSYTELSER.map((innsendingsytelse) => (
    <Route key={`${innsendingsytelse}/${pathSuffix}`} path={innsendingsytelse}>
      <Route index path={pathSuffix} element={<Component innsendingsytelse={innsendingsytelse} />} />
    </Route>
  ));
