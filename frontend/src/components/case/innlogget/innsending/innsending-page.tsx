import React from 'react';
import { useCaseErrors } from '@app/hooks/errors/use-case-errors';
import { useGoToBegrunnelseOnError } from '@app/hooks/errors/use-navigate-on-error';
import { Case } from '@app/redux-api/case/types';
import { RenderCaseinnsendingPage } from '../../common/post/innsending-page';
import { CaseLoader } from '../loader';

export const CaseInnsendingPage = () => <CaseLoader Component={RenderCaseInnsendingPage} />;

const RenderCaseInnsendingPage = ({ data }: { data: Case }) => {
  const validate = useCaseErrors(data.type);
  const [isValid] = validate(data);

  useGoToBegrunnelseOnError(isValid);

  return (
    <RenderCaseinnsendingPage
      innsendingsytelse={data.innsendingsytelse}
      hasVedlegg={data.hasVedlegg}
      type={data.type}
    />
  );
};
