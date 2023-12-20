import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useGetKlageQuery } from '@app/redux-api/case/klage/api';
import { Klage } from '@app/redux-api/case/klage/types';
import { CaseStatus } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { Journalpost } from '../../../case/innlogget/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../case/innlogget/kvittering/kvittering-page-loader';
import { KlageLoader } from '../klage-loader';

export const KlagekvitteringPage = () => <KlageLoader Component={RenderKlagekvitteringPage} />;

interface Props {
  klage: Klage;
}

const RenderKlagekvitteringPage = ({ klage }: Props) => {
  const language = useLanguage();
  const { klageskjema } = useTranslation();

  if (klage.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/klage/${klage.id}/oppsummering`} replace />;
  }

  const { steps, title_fragment, page_title } = klageskjema.common;

  return (
    <DigitalFormContainer
      activeStep={3}
      isValid
      klageOrAnke={klage}
      page_title={page_title}
      steps={steps}
      innsendingsytelse={klage.innsendingsytelse}
      title_fragment={title_fragment}
    >
      <KvitteringPageLoader caseId={klage.id} translations={klageskjema} useGetCaseQuery={useGetKlageQuery}>
        <Journalpost
          caseId={klage.id}
          finalizedDate={klage.finalizedDate}
          basePath={`${API_PATH}/klager`}
          translations={klageskjema}
        />
      </KvitteringPageLoader>
    </DigitalFormContainer>
  );
};
