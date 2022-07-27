import React, { useEffect, useState } from 'react';
import { Language } from '../../language/language';
import { useGetAnkeQuery } from '../../redux-api/case/anke/api';
import { useGetKlageQuery } from '../../redux-api/case/klage/api';
import { KvitteringLoading } from './kvittering-loading';

interface Props {
  caseId: string;
  translations: Language['klageskjema' | 'ankeskjema'];
  useGetCaseQuery: typeof useGetAnkeQuery | typeof useGetKlageQuery;
  children: React.ReactElement;
}

export const KvitteringPageLoader = ({ caseId, translations, children, useGetCaseQuery }: Props) => {
  const [isSlow, setIsSlow] = useState<boolean>(false);
  const { data } = useGetCaseQuery(caseId);

  const isJournalfoert = typeof data?.journalpostId === 'string' && data.journalpostId.length !== 0;

  useEffect(() => {
    // Melding om at den fortsatt jobber etter 8 sek.
    const timer = setTimeout(() => setIsSlow(true), 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isJournalfoert) {
    return children;
  }

  return <KvitteringLoading informStillWorking={isSlow} translations={translations} />;
};
