import React from 'react';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

export const SessionKlageinnsendingPage = () => <KlageSessionLoader Component={SessionKlageWrapper} />;

const SessionKlageWrapper = ({ klage }: { klage: ISessionKlage }) => (
  <RenderCaseinnsendingPage caseData={klage} type="session-klage" />
);
