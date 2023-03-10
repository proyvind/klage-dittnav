import React from 'react';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { RenderCaseinnsendingPage } from '../../../case/common/post/innsending-page';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionAnkeinnsendingPage = (props: Props) => (
  <AnkeSessionLoader Component={SessionAnkeWrapper} {...props} />
);

const SessionAnkeWrapper = ({ anke }: { anke: ISessionAnke }) => (
  <RenderCaseinnsendingPage caseData={anke} type="session-anke" />
);
