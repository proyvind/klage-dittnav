import { Heading } from '@navikt/ds-react';
import React, { ReactNode } from 'react';

interface Props {
  header: string;
  children: ReactNode;
}

export const InformationPointBox = ({ header, children }: Props) => (
  <section>
    <Heading level="2" size="xsmall">
      {header}
    </Heading>
    {children}
  </section>
);
