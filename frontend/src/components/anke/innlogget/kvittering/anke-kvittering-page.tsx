import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupportsDigitalAnke } from '../../../../hooks/use-supports-digital';
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
import { Journalpost } from '../../../case/innlogget/kvittering/kvittering';
import { KvitteringPageLoader } from '../../../case/innlogget/kvittering/kvittering-page-loader';
import { AnkeLoader } from '../anke-loader';

export const AnkekvitteringPage = () => <AnkeLoader Component={RenderAnkekvitteringPage} />;

interface Props {
  anke: Anke;
}

const RenderAnkekvitteringPage = ({ anke }: Props) => {
  const language = useLanguage();
  const { ankeskjema, ankeskjema_post } = useTranslation();
  const supportsDigital = useSupportsDigitalAnke(anke.innsendingsytelse);

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
    </Container>
  );
};
