import React from 'react';
import { useAnkeErrors, useGoToBegrunnelseOnError } from '../../../../hooks/use-errors';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { Anke } from '../../../../redux-api/case/anke/types';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { AnkeLoader } from '../anke-loader';

export const AnkeinnsendingPage = () => <AnkeLoader Component={AnkeinnsendingPageWrapper} />;

interface Props {
  anke: Anke;
}

const AnkeinnsendingPageWrapper = ({ anke }: Props) => {
  const { ankeskjema_post } = useTranslation();
  const { isValid } = useAnkeErrors(anke);
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
