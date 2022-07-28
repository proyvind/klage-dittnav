import React from 'react';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { KlageSessionLoader } from '../klage-loader';
import { ISessionKlage } from '../types';

export const SessionKlageinnsendingPage = () => <KlageSessionLoader Component={SessionKlageWrapper} />;
export default SessionKlageinnsendingPage;

const SessionKlageWrapper = ({ klage }: { klage: ISessionKlage }) => (
  <RenderCaseinnsendingPage caseData={klage} type="session-klage" />
);
