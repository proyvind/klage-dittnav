import React from 'react';
import { TemaKey } from '../../tema/tema';
import { AvailableAnker } from './available-anker';
import { DraftAnker } from './draft-anker';
import { DraftKlager } from './draft-klager';

interface Props {
  temaAndTitleKeyList?: [TemaKey, string | null][];
}

export const DraftKlageAndAnkeLists = ({ temaAndTitleKeyList = [] }: Props) => (
  <>
    <DraftKlager temaAndTitleKeyList={temaAndTitleKeyList} />
    <DraftAnker temaAndTitleKeyList={temaAndTitleKeyList} />
  </>
);

// eslint-disable-next-line import/no-unused-modules
export const AvailableAnkerList = ({ temaAndTitleKeyList = [] }: Props) => (
  <AvailableAnker temaAndTitleKeyList={temaAndTitleKeyList} />
);
