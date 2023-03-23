import React from 'react';
import { useGoToBegrunnelseOnError, useKlageErrors } from '@app/hooks/use-errors';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { Klage } from '@app/redux-api/case/klage/types';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageLoader } from '../klage-loader';

export const KlageinnsendingPage = () => <KlageLoader Component={KlageWrapper} />;

const KlageWrapper = ({ klage }: { klage: Klage }) => {
  const { klageskjema_post } = useTranslation();
  const { isValid } = useKlageErrors(klage);
  useGoToBegrunnelseOnError(isValid);

  return (
    <RenderCaseinnsendingPage
      innsendingsytelse={klage.innsendingsytelse}
      hasVedlegg={klage.hasVedlegg}
      pageIdentifier={PageIdentifier.KLAGESKJEMA_INNSENDING}
      skjema_post={klageskjema_post}
    />
  );
};
