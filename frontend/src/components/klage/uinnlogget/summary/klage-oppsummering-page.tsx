import React from 'react';
import { Innsendingsytelse } from '../../../../innsendingsytelser/innsendingsytelser';
import { SummaryPagePost } from '../../../case/common/post/summary-post';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionKlageoppsummeringPage = (props: IProps) => <KlageSessionLoader Component={Wrapper} {...props} />;

interface IWrapperProps {
  klage: ISessionKlage;
}

const Wrapper = ({ klage }: IWrapperProps) => (
  <SummaryPagePost caseData={klage} type="session-klage">
    <DownloadButton caseData={klage} type="klage" />
  </SummaryPagePost>
);
