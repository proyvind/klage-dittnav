import React from 'react';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionKlageinnsendingPage = (props: Props) => (
  <KlageSessionLoader Component={SessionKlageWrapper} {...props} />
);

const SessionKlageWrapper = ({ klage }: { klage: ISessionKlage }) => (
  <RenderCaseinnsendingPage caseData={klage} type="session-klage" />
);
