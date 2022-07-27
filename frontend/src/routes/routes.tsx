import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ENVIRONMENT } from '../environment/environment';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { INNGANG_KATEGORIER, InngangKategori, Kategori } from '../kategorier/kategorier';
import { LanguageComponent } from '../language/component';
import { Languages } from '../language/types';
import { UserLoader } from '../user/user-loader';
import { AnkebegrunnelsePage } from './ankeskjema/begrunnelse/anke-begrunnelse-page';
import { AnkekvitteringPage } from './ankeskjema/kvittering/anke-kvittering-page';
import { AnkeoppsummeringPage } from './ankeskjema/summary/anke-oppsummering-page';
import { CreateAnke } from './create-anke';
import { CreateKlage } from './create-klage';
import { DekoratorSetRedirect } from './dekorator-set-redirect';
import { InngangFullmakt } from './inngang/inngang-fullmakt';
import { InngangInnsendingDigital } from './inngang/inngang-innsendingsvalg-digital';
import { InngangInnsendingPost } from './inngang/inngang-innsendingsvalg-post';
import { InngangKategorier } from './inngang/inngang-kategorier';
import { KlagebegrunnelsePage } from './klageskjema/begrunnelse/klage-begrunnelse-page';
import { KlagekvitteringPage } from './klageskjema/kvittering/klage-kvittering-page';
import { KlageoppsummeringPage } from './klageskjema/summary/klage-oppsummering-page';
import { NotFoundPage } from './not-found-page';
import { RootWithQuery } from './root-with-query';

export const Router = () => (
  <BrowserRouter>
    <DekoratorSetRedirect>
      <LanguageComponent>
        <ErrorBoundary>
          <Routes>
            <Route path="/:lang">
              <Route
                path="anke/ny"
                element={
                  <UserLoader>
                    <CreateAnke />
                  </UserLoader>
                }
              />

              <Route
                path="klage/ny"
                element={
                  <UserLoader>
                    <CreateKlage />
                  </UserLoader>
                }
              />

              <Route
                path="ny"
                element={
                  <UserLoader>
                    <CreateKlage />
                  </UserLoader>
                }
              />

              {innsendingsRoutes}
              {kategoriRoutes}
              {fullmaktRoutes}

              <Route path="klage">
                <Route path=":klageId">
                  <Route path="begrunnelse" element={<KlagebegrunnelsePage />} />
                  <Route path="oppsummering" element={<KlageoppsummeringPage />} />
                  <Route path="kvittering" element={<KlagekvitteringPage />} />
                </Route>
              </Route>

              <Route path="anke">
                <Route path=":ankeId">
                  <Route path="begrunnelse" element={<AnkebegrunnelsePage />} />
                  <Route path="oppsummering" element={<AnkeoppsummeringPage />} />
                  <Route path="kvittering" element={<AnkekvitteringPage />} />
                </Route>
              </Route>

              <Route path="" element={<RootWithQuery />} />
              <Route path="" element={<Navigate to={`/${Languages.nb}`} />} />
            </Route>
            <Route path="/" element={<Navigate to={`/${Languages.nb}`} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
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

const getInngangInnsendingComponent = (inngangkategori: InngangKategori, kategori: Kategori) => {
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
};

const innsendingsRoutes = INNGANG_KATEGORIER.flatMap((inngangkategori) =>
  inngangkategori.kategorier.map((kategori) => {
    const path = `${inngangkategori.path}/${kategori.path}`;
    return <Route key={path} path={path} element={getInngangInnsendingComponent(inngangkategori, kategori)} />;
  })
);

const fullmaktRoutes = INNGANG_KATEGORIER.flatMap((inngangkategori) =>
  inngangkategori.kategorier.map((kategori) => {
    const path = `${inngangkategori.path}/${kategori.path}/fullmakt`;
    return (
      <Route
        key={path}
        path={path}
        element={
          <UserLoader>
            <InngangFullmakt inngangkategori={inngangkategori} kategori={kategori} />
          </UserLoader>
        }
      />
    );
  })
);
