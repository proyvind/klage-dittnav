import React from 'react';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { SummaryPagePost } from '../../../case/common/post/summary-post';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionAnkeoppsummeringPage = (props: Props) => <AnkeSessionLoader Component={Wrapper} {...props} />;

const Wrapper = ({ anke }: { anke: ISessionAnke }) => (
  <SummaryPagePost caseData={anke} type="session-anke">
    <DownloadButton caseData={anke} type="anke" />
  </SummaryPagePost>
);
