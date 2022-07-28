import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupportsDigital } from '../../../../hooks/use-supports-digital';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { useGetKlageQuery } from '../../../../redux-api/case/klage/api';
import { Klage } from '../../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { API_PATH } from '../../../../redux-api/common';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { Kvittering } from '../../../case/innlogget/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../case/innlogget/kvittering/kvittering-page-loader';
import { KlageLoader } from '../klage-loader';

export const KlagekvitteringPage = () => <KlageLoader Component={RenderKlagekvitteringPage} />;
export default KlagekvitteringPage;

interface Props {
  klage: Klage;
}

const RenderKlagekvitteringPage = ({ klage }: Props) => {
  const language = useLanguage();
  const { klageskjema } = useTranslation();
  const supportsDigital = useSupportsDigital(klage.tema, klage.titleKey);

  useLogPageView(PageIdentifier.KLAGESKJEMA_KVITTERING);

  if (klage.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/klage/${klage.id}/oppsummering`} replace />;
  }

  const { steps, title_fragment, page_title } = klageskjema.common;

  const Container = supportsDigital ? DigitalFormContainer : PostFormContainer;

  return (
    <Container
      activeStep={3}
      isValid
      klageOrAnke={klage}
      page_title={page_title}
      steps={steps}
      temaKey={klage.tema}
      title_fragment={title_fragment}
      titleKey={klage.titleKey}
    >
      <KvitteringPageLoader caseId={klage.id} translations={klageskjema} useGetCaseQuery={useGetKlageQuery}>
        <Kvittering
          caseId={klage.id}
          finalizedDate={klage.finalizedDate}
          basePath={`${API_PATH}/klager`}
          translations={klageskjema}
          showFullmaktInfo
        />
      </KvitteringPageLoader>
    </Container>
  );
};
