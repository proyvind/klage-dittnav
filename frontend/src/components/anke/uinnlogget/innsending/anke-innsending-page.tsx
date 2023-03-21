import React from 'react';
import { useGoToBegrunnelseOnError, useSessionAnkeErrors } from '../../../../hooks/use-errors';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionAnkeinnsendingPage = (props: Props) => (
  <AnkeSessionLoader Component={SessionAnkeWrapper} {...props} />
);

const SessionAnkeWrapper = ({ anke }: { anke: ISessionAnke }) => {
  const { ankeskjema_post } = useTranslation();
  const { isValid } = useSessionAnkeErrors(anke);
  useGoToBegrunnelseOnError(isValid);

  return (
    <RenderCaseinnsendingPage
      innsendingsytelse={anke.innsendingsytelse}
      hasVedlegg={anke.hasVedlegg}
      pageIdentifier={PageIdentifier.ANKESKJEMA_INNSENDING}
      skjema_post={ankeskjema_post}
    />
  );
};
