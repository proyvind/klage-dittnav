import React from 'react';
import { Navigate } from 'react-router-dom';
import { Kvittering } from '../../../components/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../components/kvittering/kvittering-page-loader';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { useGetAnkeQuery } from '../../../redux-api/case/anke/api';
import { Anke } from '../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { AnkeLoader } from '../../../store/anke/anke-loader';
import { UserLoader } from '../../../user/user-loader';
import { AnkeFormContainer } from '../form-container';

export const AnkekvitteringPage = () => (
  <UserLoader>
    <AnkeLoader Component={RenderAnkekvitteringPage} />
  </UserLoader>
);

interface Props {
  anke: Anke;
}

const RenderAnkekvitteringPage = ({ anke }: Props) => {
  const language = useLanguage();
  const { ankeskjema } = useTranslation();

  useLogPageView(PageIdentifier.ANKESKJEMA_KVITTERING);

  if (anke.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/anke/${anke.ankeInternalSaksnummer}/oppsummering`} replace />;
  }

  return (
    <AnkeFormContainer activeStep={3} isValid={true}>
      <KvitteringPageLoader
        caseId={anke.ankeInternalSaksnummer}
        translations={ankeskjema}
        useGetCaseQuery={useGetAnkeQuery}
      >
        <Kvittering
          caseId={anke.ankeInternalSaksnummer}
          finalizedDate={anke.finalizedDate}
          basePath={`${API_PATH}/anker`}
          translations={ankeskjema}
        />
      </KvitteringPageLoader>
    </AnkeFormContainer>
  );
};
