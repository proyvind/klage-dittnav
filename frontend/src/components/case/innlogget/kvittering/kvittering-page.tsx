import React from 'react';
import { Navigate } from 'react-router-dom';
import { DigitalFormContainer } from '@app/components/case/common/digital/digital-form-container';
import { KvitteringPageLoader } from '@app/components/case/innlogget/kvittering/kvittering-page-loader';
import { CaseLoader } from '@app/components/case/innlogget/loader';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { Case, CaseStatus } from '@app/redux-api/case/types';

export const CaseKvitteringPage = () => <CaseLoader Component={RenderCaseKvitteringPage} />;

interface Props {
  data: Case;
}

const RenderCaseKvitteringPage = ({ data }: Props) => {
  const language = useLanguage();
  const { skjema } = useTranslation();

  if (data.status !== CaseStatus.DONE) {
    return <Navigate to={`/${language}/sak/${data.id}/oppsummering`} replace />;
  }

  const { title_fragment, page_title } = skjema.common;

  return (
    <DigitalFormContainer
      activeStep={3}
      isValid
      case={data}
      page_title={page_title[data.type]}
      steps={skjema.steps[data.type]}
      innsendingsytelse={data.innsendingsytelse}
      title_fragment={title_fragment[data.type]}
    >
      <KvitteringPageLoader caseId={data.id} type={data.type} />
    </DigitalFormContainer>
  );
};
