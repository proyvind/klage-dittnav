import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupportsDigital } from '../../../../hooks/use-supports-digital';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { useGetAnkeQuery } from '../../../../redux-api/case/anke/api';
import { Anke } from '../../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { API_PATH } from '../../../../redux-api/common';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { Kvittering } from '../../../case/innlogget/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../case/innlogget/kvittering/kvittering-page-loader';
import { AnkeLoader } from '../anke-loader';

export const AnkekvitteringPage = () => <AnkeLoader Component={RenderAnkekvitteringPage} />;
export default AnkekvitteringPage;

interface Props {
  anke: Anke;
}

const RenderAnkekvitteringPage = ({ anke }: Props) => {
  const language = useLanguage();
  const { ankeskjema, ankeskjema_post } = useTranslation();
  const supportsDigital = useSupportsDigital(anke.tema);

  useLogPageView(PageIdentifier.ANKESKJEMA_KVITTERING);

  if (anke.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/anke/${anke.id}/oppsummering`} replace />;
  }

  const Container = supportsDigital ? DigitalFormContainer : PostFormContainer;

  const { steps, title_fragment, page_title } = supportsDigital ? ankeskjema.common : ankeskjema_post.common;

  return (
    <Container
      activeStep={3}
      isValid
      klageOrAnke={anke}
      page_title={page_title}
      steps={steps}
      temaKey={anke.tema}
      title_fragment={title_fragment}
      titleKey={anke.titleKey}
    >
      <KvitteringPageLoader caseId={anke.id} translations={ankeskjema} useGetCaseQuery={useGetAnkeQuery}>
        <Kvittering
          caseId={anke.id}
          finalizedDate={anke.finalizedDate}
          basePath={`${API_PATH}/anker`}
          translations={ankeskjema}
          showFullmaktInfo
        />
      </KvitteringPageLoader>
    </Container>
  );
};
