import { GuidePanel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useErrors } from '../../hooks/use-errors';
import { useTemaName } from '../../hooks/use-titles';
import { useIsAuthenticated, useUser } from '../../hooks/use-user';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { FormTitleContainer } from '../../routes/form-title-container';
import { CenteredContainer } from '../../styled-components/common';
import { ContentContainer } from '../../styled-components/content-container';
import { FormMainContainer } from '../../styled-components/main-container';
import { TemaKey } from '../../tema/tema';
import { Errors } from '../case/common/errors';
import { FormFieldsIds } from '../case/common/form-fields-ids';
import { DownloadButton } from '../case/uinnlogget/summary/download-button';
import { FnrDnr } from '../fnr-dnr/fnr-dnr';
import { KaEnhet } from './ka-enhet';
import { IEttersendelse } from './types';

interface Props {
  tema: TemaKey;
}

export const EttersendelsePage = ({ tema }: Props) => {
  const temaName = useTemaName(tema);
  const { ettersendelse } = useTranslation();
  const language = useLanguage();
  const { data: user, isLoading } = useUser();
  const [foedselsnummer, setFoedselsnummer] = useState('');
  const [enhetsnummer, setEnhetsnummer] = useState<string | null>(null);
  const { data: authenticated } = useIsAuthenticated();

  const caseData: IEttersendelse = {
    tema,
    foedselsnummer:
      authenticated ?? false ? user?.folkeregisteridentifikator?.identifikasjonsnummer ?? '' : foedselsnummer,
    enhetsnummer,
    language,
  };

  const { errors, setError, isEverythingValid } = useErrors({
    type: authenticated ?? false ? 'authenticated-ettersendelse' : 'unauthenticated-ettersendelse',
    caseData,
  });

  const { title, guide_text } = ettersendelse;

  return (
    <FormMainContainer>
      <FormTitleContainer tittel={title} undertittel={temaName} />
      <ContentContainer>
        <GuidePanel>
          {guide_text}
          <address>
            NAV skanning
            <br />
            Postboks 1400
            <br />
            0109 Oslo
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
