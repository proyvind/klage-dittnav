import React from 'react';
import { useGoToBegrunnelseOnError, useSessionKlageErrors } from '../../../../hooks/use-errors';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionKlageinnsendingPage = (props: Props) => (
  <KlageSessionLoader Component={SessionKlageWrapper} {...props} />
);

const SessionKlageWrapper = ({ klage }: { klage: ISessionKlage }) => {
  const { klageskjema_post } = useTranslation();
  const { isValid } = useSessionKlageErrors(klage);
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
