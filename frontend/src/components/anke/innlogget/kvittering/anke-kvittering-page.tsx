import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useGetAnkeQuery } from '@app/redux-api/case/anke/api';
import { Anke } from '@app/redux-api/case/anke/types';
import { CaseStatus } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { Journalpost } from '../../../case/innlogget/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../case/innlogget/kvittering/kvittering-page-loader';
import { AnkeLoader } from '../anke-loader';

export const AnkekvitteringPage = () => <AnkeLoader Component={RenderAnkekvitteringPage} />;

interface Props {
  anke: Anke;
}

const RenderAnkekvitteringPage = ({ anke }: Props) => {
  const language = useLanguage();
  const { ankeskjema } = useTranslation();

  if (anke.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/anke/${anke.id}/oppsummering`} replace />;
  }

  const { steps, title_fragment, page_title } = ankeskjema.common;

  return (
    <DigitalFormContainer
      activeStep={3}
      isValid
      klageOrAnke={anke}
      page_title={page_title}
      steps={steps}
      innsendingsytelse={anke.innsendingsytelse}
      title_fragment={title_fragment}
    >
      <KvitteringPageLoader caseId={anke.id} translations={ankeskjema} useGetCaseQuery={useGetAnkeQuery}>
        <Journalpost
          caseId={anke.id}
          finalizedDate={anke.finalizedDate}
          basePath={`${API_PATH}/anker`}
          translations={ankeskjema}
        />
      </KvitteringPageLoader>
    </DigitalFormContainer>
  );
};
