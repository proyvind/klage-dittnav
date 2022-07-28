import React from 'react';
import { SummaryPagePost } from '../../../case/common/post/summary-post';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { KlageSessionLoader } from '../klage-loader';
import { ISessionKlage } from '../types';

export const SessionKlageoppsummeringPage = () => <KlageSessionLoader Component={Wrapper} />;
export default SessionKlageoppsummeringPage;

const Wrapper = ({ klage }: { klage: ISessionKlage }) => (
  <SummaryPagePost caseData={klage} type="session-klage">
    <DownloadButton caseData={klage} titleKey={klage.titleKey} type="klage" />
  </SummaryPagePost>
);
