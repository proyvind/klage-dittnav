import { Alert, Button, Heading, LinkPanel } from '@navikt/ds-react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { FnrInput } from '../../components/fnr-input/fnr-input';
import { displayFnr, getFullName } from '../../functions/display';
import { isApiError } from '../../functions/is-api-error';
import { queryStringify } from '../../functions/query-string';
import { useTemaName, useTitle, useTitleOrYtelse } from '../../hooks/use-titles';
import { InngangKategori, Kategori } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { usePageInit } from '../../page-init/page-init';
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

export const InngangFullmakt = ({ kategori, inngangkategori }: Props) => {
  const { titleKey, temaKey } = kategori;
  const title = useTitleOrYtelse(temaKey, titleKey);
  const lang = useLanguage();
  const { inngang } = useTranslation();
  usePageInit(`${title} \u2013 ${inngang.innsendingsvalg.fullmakt.title_postfix}`);
  const breadcrumbs = useCreateBreadcrumbs(inngangkategori, kategori, lang);
  useBreadcrumbs(breadcrumbs, inngang.innsendingsvalg.fullmakt.title);

  const [fodselsnummer, setFodselsnummer] = useState<string>('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [getFullmaktsgiver, { isLoading: loading, data: selectedFullmaktsgiver, error }] =
    useLazyGetFullmaktsgiverQuery();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const temaName = useTemaName(temaKey);

  const { no_fullmakt, invalid_nin } = inngang.innsendingsvalg.fullmakt;

  const query = useMemo(
    () =>
      queryStringify({
        tema: temaKey,
        titleKey,
        fullmaktsgiver: fodselsnummer,
      }),
    [temaKey, titleKey, fodselsnummer]
  );

  const handleSubmit = async () => {
    if (valid === true) {
      getFullmaktsgiver({ temaKey, fullmaktsgiver: fodselsnummer });
      setErrorMessage(null);
    } else {
      setErrorMessage(invalid_nin);
    }
  };

  useEffect(() => {
    if (isApiError(error) && error.data.status === 404) {
      setErrorMessage(no_fullmakt(fodselsnummer, temaName));
    }
  }, [error, fodselsnummer, no_fullmakt, temaName]);

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
            <FnrInput
              label={inngang.innsendingsvalg.fullmakt.nin}
              autoComplete="off"
              value={fodselsnummer ?? ''}
              onChange={(e) => setFodselsnummer(e.target.value)}
              onValidate={(val) => setValid(val)}
              onKeyDown={({ key }) => {
                if (key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <Button variant="primary" onClick={handleSubmit} loading={loading}>
              {inngang.innsendingsvalg.fullmakt.search}
            </Button>
          </FieldWithButton>

          <ErrorMessage errorMessage={errorMessage} />

          <Fullmakt selectedFullmaktsgiver={selectedFullmaktsgiver} query={query} />
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
  query: string;
}

const Fullmakt = ({ selectedFullmaktsgiver, query }: FullmaktProps) => {
  if (typeof selectedFullmaktsgiver === 'undefined') {
    return null;
  }

  return (
    <MarginTopContainer>
      <LinkPanel href={`/ny?${query}`} border>
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
  const title = useTitle(kategori.titleKey);

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
