import { BodyLong, BodyShort, GuidePanel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useAddress } from '@app/hooks/use-address';
import {
  IErrorsState,
  useAuthenticatedEttersendelseErrors,
  useUnauthenticatedEttersendelseErrors,
} from '@app/hooks/use-errors';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { useIsAuthenticated, useUser } from '@app/hooks/use-user';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { FormTitleContainer } from '@app/routes/form-title-container';
import { CenteredContainer } from '@app/styled-components/common';
import { ContentContainer } from '@app/styled-components/content-container';
import { FormMainContainer } from '@app/styled-components/main-container';
import { Errors } from '../case/common/errors';
import { FormFieldsIds } from '../case/common/form-fields-ids';
import { DownloadButton } from '../case/uinnlogget/summary/download-button';
import { FnrDnr } from '../fnr-dnr/fnr-dnr';
import { LoadingPage } from '../loading-page/loading-page';
import { KaEnhet } from './ka-enhet';
import { IEttersendelse } from './types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const EttersendelsePage = (props: Props) => {
  const { data: authenticated, isLoading } = useIsAuthenticated();

  const { user_loader } = useTranslation();

  if (isLoading || typeof authenticated === 'undefined') {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  return (
    <InternalEttersendelsePage
      {...props}
      authenticated={authenticated}
      useErrors={authenticated ? useAuthenticatedEttersendelseErrors : useUnauthenticatedEttersendelseErrors}
    />
  );
};

interface EttersendelsePageProps extends Props {
  authenticated: boolean;
  useErrors: (ettersendelse: IEttersendelse) => IErrorsState;
}

const InternalEttersendelsePage = ({ innsendingsytelse, authenticated, useErrors }: EttersendelsePageProps) => {
  const [undertittel] = useInnsendingsytelseName(innsendingsytelse);
  const { ettersendelse } = useTranslation();
  const language = useLanguage();
  const { data: user, isLoading } = useUser();
  const [foedselsnummer, setFoedselsnummer] = useState('');
  const [enhetsnummer, setEnhetsnummer] = useState<string | null>(null);

  const caseData: IEttersendelse = {
    innsendingsytelse,
    foedselsnummer: authenticated ? user?.folkeregisteridentifikator?.identifikasjonsnummer ?? '' : foedselsnummer,
    enhetsnummer,
    language,
  };

  const { errors, setError, isEverythingValid } = useErrors(caseData);

  const { title, guide_text, send_by_post, employer_info_logged_in, employer_info_logged_out } = ettersendelse;

  const [line1, line2, line3] = useAddress(innsendingsytelse);

  return (
    <FormMainContainer>
      <FormTitleContainer tittel={title} undertittel={undertittel} />
      <ContentContainer>
        <GuidePanel>
          <BodyLong spacing>{guide_text}</BodyLong>
          <BodyLong spacing>{authenticated ? employer_info_logged_in : employer_info_logged_out}</BodyLong>
          <BodyShort>{send_by_post}</BodyShort>
          <address>
            {line1}
            <br />
            {line2}
            <br />
            {line3}
          </address>
        </GuidePanel>
        <FnrDnr
          fnr={user?.folkeregisteridentifikator?.identifikasjonsnummer}
          userFnr={foedselsnummer}
          onChange={setFoedselsnummer}
          onError={setError}
          error={errors[FormFieldsIds.FNR_DNR_NPID]}
          isLoading={isLoading}
        />
        <KaEnhet
          enhet={enhetsnummer}
          error={errors[FormFieldsIds.KLAGEENHET_ETTERSENDELSE]}
          onChange={setEnhetsnummer}
        />

        <Errors {...errors} />
        <CenteredContainer>
          <DownloadButton type="ettersendelse" caseData={caseData} validForm={isEverythingValid} />
        </CenteredContainer>
      </ContentContainer>
    </FormMainContainer>
  );
};
