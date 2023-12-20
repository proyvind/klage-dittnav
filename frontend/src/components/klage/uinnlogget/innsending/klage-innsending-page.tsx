import React from 'react';
import { useGoToBegrunnelseOnError, useSessionKlageErrors } from '@app/hooks/use-errors';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
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
      skjema_post={klageskjema_post}
    />
  );
};
