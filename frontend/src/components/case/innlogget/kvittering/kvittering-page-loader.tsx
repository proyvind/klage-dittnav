import React, { useEffect, useState } from 'react';
import { Language } from '../../../../language/language';
import { useGetAnkeQuery } from '../../../../redux-api/case/anke/api';
import { useGetKlageQuery } from '../../../../redux-api/case/klage/api';
import { Kvittering } from './kvittering';
import { KvitteringLoading } from './kvittering-loading';

interface Props {
  caseId: string;
  translations: Language['klageskjema' | 'ankeskjema'];
  useGetCaseQuery: typeof useGetAnkeQuery | typeof useGetKlageQuery;
  children: React.ReactElement;
}

export const KvitteringPageLoader = ({ caseId, translations, children, useGetCaseQuery }: Props) => {
  const [showStillWorking, setShowStillWorking] = useState<boolean>(false);
  const [showKvittering, setShowKvittering] = useState<boolean>(false);

  const { data } = useGetCaseQuery(caseId);

  const isJournalfoert = typeof data?.journalpostId === 'string' && data.journalpostId.length !== 0;

  useEffect(() => {
    const stillWorkingTimer = setTimeout(() => setShowStillWorking(true), 8000);
    const showKvitteringTimer = setTimeout(() => setShowKvittering(true), 15000);

    return () => {
      clearTimeout(stillWorkingTimer);
      clearTimeout(showKvitteringTimer);
    };
  }, []);

  if (isJournalfoert) {
    return <Kvittering translations={translations}>{children}</Kvittering>;
  }

  if (showKvittering) {
    return <Kvittering translations={translations}></Kvittering>;
  }

  return <KvitteringLoading informStillWorking={showStillWorking} translations={translations} />;
};
