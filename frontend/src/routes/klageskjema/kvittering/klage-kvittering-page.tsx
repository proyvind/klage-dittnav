import React from 'react';
import { Navigate } from 'react-router-dom';
import { Kvittering } from '../../../components/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../components/kvittering/kvittering-page-loader';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { useGetKlageQuery } from '../../../redux-api/case/klage/api';
import { Klage } from '../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { KlageLoader } from '../../../store/klage/klage-loader';
import { UserLoader } from '../../../user/user-loader';
import { KlageFormContainer } from '../form-container';

export const KlagekvitteringPage = () => (
  <UserLoader>
    <KlageLoader Component={RenderKlagekvitteringPage} />
  </UserLoader>
);

interface Props {
  klage: Klage;
}

const RenderKlagekvitteringPage = ({ klage }: Props) => {
  const language = useLanguage();
  const { klageskjema } = useTranslation();

  useLogPageView(PageIdentifier.KLAGESKJEMA_KVITTERING);

  if (klage.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/klage/${klage.id}/oppsummering`} replace />;
  }

  return (
    <KlageFormContainer activeStep={3} isValid>
      <KvitteringPageLoader caseId={klage.id} translations={klageskjema} useGetCaseQuery={useGetKlageQuery}>
        <Kvittering
          caseId={klage.id}
          finalizedDate={klage.finalizedDate}
          basePath={`${API_PATH}/klager`}
          translations={klageskjema}
          showFullmaktInfo
        />
      </KvitteringPageLoader>
    </KlageFormContainer>
  );
};
