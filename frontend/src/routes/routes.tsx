import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CaseBegrunnelsePage } from '@app/components/case/innlogget/begrunnelse/begrunnelse-page';
import { CaseInnsendingPage } from '@app/components/case/innlogget/innsending/innsending-page';
import { CaseKvitteringPage } from '@app/components/case/innlogget/kvittering/kvittering-page';
import { CaseOppsummeringPage } from '@app/components/case/innlogget/summary/oppsummering-page';
import { SessionCasebegrunnelsePage } from '@app/components/case/uinnlogget/begrunnelse/begrunnelse-page';
import { SessionCaseInnsendingPage } from '@app/components/case/uinnlogget/innsending/innsending-page';
import { SessionCaseOppsummeringPage } from '@app/components/case/uinnlogget/summary/oppsummering-page';
import { INNSENDINGSYTELSER, Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { LanguageComponent } from '@app/language/component';
import { CaseType } from '@app/redux-api/case/types';
import { CreateCase } from './create-case/create-case';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { ErrorBoundary } from './error-boundary';
import { NavigationLogger } from './navigation-logger';
import { NotFoundPage } from './not-found-page';
import { UpgradeSession } from './redirects';

export const Router = () => (
  <BrowserRouter>
    <NavigationLogger>
      <DekoratorSetRedirect>
        <LanguageComponent>
          <ErrorBoundary>
            <Routes>
              <Route path="/:lang" element={<UpgradeSession />}>
                <Route path="sak">
                  <Route path=":id">
                    <Route path="begrunnelse" element={<CaseBegrunnelsePage />} />
                    <Route path="oppsummering" element={<CaseOppsummeringPage />} />
                    <Route path="innsending" element={<CaseInnsendingPage />} />
                    <Route path="kvittering" element={<CaseKvitteringPage />} />
                  </Route>
                </Route>

                <Route path="klage">
                  {getRoutes(CreateCase, CaseType.KLAGE)}

                  {getRoutesWithSuffix(SessionCasebegrunnelsePage, 'begrunnelse', CaseType.KLAGE)}
                  {getRoutesWithSuffix(SessionCaseOppsummeringPage, 'oppsummering', CaseType.KLAGE)}
                  {getRoutesWithSuffix(SessionCaseInnsendingPage, 'innsending', CaseType.KLAGE)}
                </Route>

                <Route path="anke">
                  {getRoutes(CreateCase, CaseType.ANKE)}

                  {getRoutesWithSuffix(SessionCasebegrunnelsePage, 'begrunnelse', CaseType.ANKE)}
                  {getRoutesWithSuffix(SessionCaseOppsummeringPage, 'oppsummering', CaseType.ANKE)}
                  {getRoutesWithSuffix(SessionCaseInnsendingPage, 'innsending', CaseType.ANKE)}
                </Route>

                <Route path="ettersendelse">
                  <Route path="klage">
                    {getRoutes(CreateCase, CaseType.ETTERSENDELSE_KLAGE)}

                    {getRoutesWithSuffix(SessionCasebegrunnelsePage, 'begrunnelse', CaseType.ETTERSENDELSE_KLAGE)}
                    {getRoutesWithSuffix(SessionCaseOppsummeringPage, 'oppsummering', CaseType.ETTERSENDELSE_KLAGE)}
                    {getRoutesWithSuffix(SessionCaseInnsendingPage, 'innsending', CaseType.ETTERSENDELSE_KLAGE)}
                  </Route>

                  <Route path="anke">
                    {getRoutes(CreateCase, CaseType.ETTERSENDELSE_ANKE)}

                    {getRoutesWithSuffix(SessionCasebegrunnelsePage, 'begrunnelse', CaseType.ETTERSENDELSE_ANKE)}
                    {getRoutesWithSuffix(SessionCaseOppsummeringPage, 'oppsummering', CaseType.ETTERSENDELSE_ANKE)}
                    {getRoutesWithSuffix(SessionCaseInnsendingPage, 'innsending', CaseType.ETTERSENDELSE_ANKE)}
                  </Route>

                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
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
  type: CaseType;
}

type YtelseComponent = (props: YtelseComponentProps) => JSX.Element;

const getRoutes = (Component: YtelseComponent, type: CaseType) =>
  INNSENDINGSYTELSER.map((innsendingsytelse) => (
    <Route
      index
      key={innsendingsytelse}
      path={innsendingsytelse}
      element={<Component innsendingsytelse={innsendingsytelse} type={type} />}
    />
  ));

const getRoutesWithSuffix = (Component: YtelseComponent, pathSuffix: string, type: CaseType) =>
  INNSENDINGSYTELSER.map((innsendingsytelse) => (
    <Route key={`${innsendingsytelse}/${pathSuffix}`} path={innsendingsytelse}>
      <Route index path={pathSuffix} element={<Component innsendingsytelse={innsendingsytelse} type={type} />} />
    </Route>
  ));
