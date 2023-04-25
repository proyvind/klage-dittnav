import React from 'react';
import { ITema } from '@app/kategorier/kategorier';
import { TemaWithKategorier } from '@app/routes/inngang/tema-with-kategorier';
import { Temakategori } from '@app/routes/inngang/temakategori';

interface Props {
  tema: ITema;
}

export const Tema = ({ tema }: Props) => {
  if ('kategorier' in tema) {
    return <TemaWithKategorier tema={tema} />;
  }

  return <Temakategori tema={tema} />;
};
