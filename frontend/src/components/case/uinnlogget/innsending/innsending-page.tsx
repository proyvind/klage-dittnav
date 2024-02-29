import React from 'react';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { useGoToBegrunnelseOnError } from '@app/hooks/errors/use-navigate-on-error';
import { useSessionCaseErrors } from '@app/hooks/errors/use-session-case-errors';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { CaseType } from '@app/redux-api/case/types';
import { RenderCaseinnsendingPage } from '../../common/post/innsending-page';
import { KlageSessionLoader } from '../session-loader';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  type: CaseType;
}

export const SessionCaseInnsendingPage = (props: Props) => (
  <KlageSessionLoader Component={SessionKlageWrapper} {...props} />
);

const SessionKlageWrapper = ({ data }: { data: ISessionCase }) => {
  const validate = useSessionCaseErrors(data.type);
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
