import React, { useEffect, useState } from 'react';
import { useGetCaseQuery } from '@app/redux-api/case/api';
import { CaseStatus, CaseType } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { Journalpost, Kvittering } from './kvittering';
import { KvitteringLoading } from './kvittering-loading';

interface Props {
  caseId: string;
  type: CaseType;
}

export const KvitteringPageLoader = ({ type, caseId }: Props) => {
  const [showStillWorking, setShowStillWorking] = useState<boolean>(false);
  const [showKvittering, setShowKvittering] = useState<boolean>(false);

  const { data } = useGetCaseQuery(caseId);

  useEffect(() => {
    const stillWorkingTimer = setTimeout(() => setShowStillWorking(true), 8000);
    const showKvitteringTimer = setTimeout(() => setShowKvittering(true), 15000);

    return () => {
      clearTimeout(stillWorkingTimer);
      clearTimeout(showKvitteringTimer);
    };
  }, []);

  if (data === undefined) {
    return <KvitteringLoading informStillWorking={showStillWorking} type={type} />;
  }

  const isDone = data.status === CaseStatus.DONE;

  if (isDone) {
    return (
      <Kvittering type={data.type} ytelse={data.innsendingsytelse}>
        {data.journalpostId !== null ? (
          <Journalpost
            caseId={data.id}
            finalizedDate={data.finalizedDate}
            basePath={`${API_PATH}/klanker`}
            type={data.type}
          />
        ) : null}
      </Kvittering>
    );
  }

  if (showKvittering) {
    return <Kvittering type={type} ytelse={data.innsendingsytelse} />;
  }

  return <KvitteringLoading informStillWorking={showStillWorking} type={type} />;
};
