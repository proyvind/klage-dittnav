import React from 'react';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

export const SessionAnkeinnsendingPage = () => <AnkeSessionLoader Component={SessionAnkeWrapper} />;

const SessionAnkeWrapper = ({ anke }: { anke: ISessionAnke }) => (
  <RenderCaseinnsendingPage caseData={anke} type="session-anke" />
);
