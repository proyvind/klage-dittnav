import React from 'react';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { AvailableAnker } from './available-anker';
import { DraftAnker } from './draft-anker';
import { DraftKlager } from './draft-klager';

interface Props {
  innsendingsytelser?: Innsendingsytelse[];
}

export const DraftKlageAndAnkeLists = ({ innsendingsytelser = [] }: Props) => (
  <>
    <DraftKlager innsendingsytelser={innsendingsytelser} />
    <DraftAnker innsendingsytelser={innsendingsytelser} />
  </>
);

// eslint-disable-next-line import/no-unused-modules
export const AvailableAnkerList = ({ innsendingsytelser = [] }: Props) => (
  <AvailableAnker innsendingsytelser={innsendingsytelser} />
);
