import React from 'react';
import { SummaryPagePost } from '../../../case/common/post/summary-post';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

export const SessionAnkeoppsummeringPage = () => <AnkeSessionLoader Component={Wrapper} />;
export default SessionAnkeoppsummeringPage;

const Wrapper = ({ anke }: { anke: ISessionAnke }) => (
  <SummaryPagePost caseData={anke} type="session-anke">
    <DownloadButton caseData={anke} type="anke" />
  </SummaryPagePost>
);
