import { Alert, Button, Heading, LinkPanel } from '@navikt/ds-react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { FnrDnrInput } from '../../components/fnr-dnr-input/fnr-dnr-input';
import { displayFnr, getFullName } from '../../functions/display';
import { isApiError } from '../../functions/is-api-error';
import { queryStringify } from '../../functions/query-string';
import { usePageInit } from '../../hooks/use-page-init';
import { useInnsendingsytelseName, useTitle } from '../../hooks/use-titles';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { InngangKategori, Kategori } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { useLazyGetFullmaktsgiverQuery } from '../../redux-api/user/api';
import { IUser } from '../../redux-api/user/types';
import { MarginTopContainer } from '../../styled-components/common';
import { InngangMainContainer } from '../../styled-components/main-container';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  kategori: Kategori;
  inngangkategori: InngangKategori;
}

const FieldWithButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`;

// eslint-disable-next-line import/no-unused-modules
export const InngangFullmakt = ({ kategori, inngangkategori }: Props) => {
  const { innsendingsytelse } = kategori;
  const [title] = useInnsendingsytelseName(innsendingsytelse);
  const lang = useLanguage();
  const { inngang } = useTranslation();
  usePageInit(`${title} \u2013 ${inngang.innsendingsvalg.fullmakt.title_postfix}`);
  const breadcrumbs = useCreateBreadcrumbs(inngangkategori, kategori, lang);
  useBreadcrumbs(breadcrumbs, inngang.innsendingsvalg.fullmakt.title);

  const [fodselsnummer, setFodselsnummer] = useState<string>('');
  const [getFullmaktsgiver, { isLoading: loading, data: selectedFullmaktsgiver, error }] =
    useLazyGetFullmaktsgiverQuery();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { no_fullmakt } = inngang.innsendingsvalg.fullmakt;

  const query = useMemo(
    () => queryStringify({ innsendingsytelse, fullmaktsgiver: fodselsnummer }),
    [innsendingsytelse, fodselsnummer]
  );

  const handleSubmit = () => {
    getFullmaktsgiver({ innsendingsytelse, fullmaktsgiver: fodselsnummer });
  };

  useEffect(() => {
    if (isApiError(error) && error.data.status === 404) {
      setErrorMessage(no_fullmakt(fodselsnummer, title));
    }
  }, [error, fodselsnummer, no_fullmakt, title]);

  const onChangeFoedselsnummer = (value: string) => {
    if (fodselsnummer !== value) {
      setFodselsnummer(value);
    }
  };

  return (
    <InngangMainContainer>
      <PanelContainer>
        <CenteredHeading level="1" size="large" spacing>
          {title}
        </CenteredHeading>

        <InngangPanel as="section">
          <Heading size="small" level="1" spacing>
            {inngang.innsendingsvalg.fullmakt.who}
          </Heading>
          <FieldWithButton>
            <FnrDnrInput
              value={fodselsnummer}
              onChange={onChangeFoedselsnummer}
              onBlur={onChangeFoedselsnummer}
              onError={(id, e) => setErrorMessage(e ?? null)}
              error={errorMessage ?? undefined}
              // onKeyDown={({ key }) => {
              //   if (key === 'Enter') {
              //     handleSubmit();
              //   }
              // }}
            />
            <Button variant="primary" onClick={handleSubmit} loading={loading}>
              {inngang.innsendingsvalg.fullmakt.search}
            </Button>
          </FieldWithButton>

          <ErrorMessage errorMessage={errorMessage} />

          <Fullmakt
            selectedFullmaktsgiver={selectedFullmaktsgiver}
            innsendingsytelse={kategori.innsendingsytelse}
            query={query}
          />
        </InngangPanel>
      </PanelContainer>
    </InngangMainContainer>
  );
};

interface ErrorMessageProps {
  errorMessage: string | null;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) =>
  errorMessage !== null ? (
    <MarginTopContainer>
      <Alert variant="error">{errorMessage}</Alert>
    </MarginTopContainer>
  ) : null;

interface FullmaktProps {
  selectedFullmaktsgiver?: IUser;
  innsendingsytelse: Innsendingsytelse;
  query: string;
}

const Fullmakt = ({ selectedFullmaktsgiver, innsendingsytelse, query }: FullmaktProps) => {
  if (typeof selectedFullmaktsgiver === 'undefined') {
    return null;
  }

  return (
    <MarginTopContainer>
      <LinkPanel href={`/klage/ny/${innsendingsytelse}?${query}`} border>
        <LinkPanel.Description>
          {`${getFullName(selectedFullmaktsgiver)} (${displayFnr(
            selectedFullmaktsgiver.folkeregisteridentifikator?.identifikasjonsnummer ?? ''
          )})`}
        </LinkPanel.Description>
      </LinkPanel>
    </MarginTopContainer>
  );
};

const useCreateBreadcrumbs = (inngangkategori: InngangKategori, kategori: Kategori, lang: Languages): Breadcrumb[] => {
  const [title] = useTitle(kategori.innsendingsytelse);

  return useMemo(
    () => [
      {
        title: inngangkategori.title[lang],
        url: `/${lang}/${inngangkategori.path}`,
        handleInApp: true,
      },
      {
        title,
        url: `/${lang}/${inngangkategori.path}/${kategori.path}`,
        handleInApp: true,
      },
    ],
    [inngangkategori.path, inngangkategori.title, kategori.path, lang, title]
  );
};
