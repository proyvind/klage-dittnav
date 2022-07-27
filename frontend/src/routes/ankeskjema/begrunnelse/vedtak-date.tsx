import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { InformationPointBox } from '../../../components/information-point-box/information-point-box';
import { ISODate, dateDisplayWithFallbackText } from '../../../date/date';
import { useTranslation } from '../../../language/use-translation';

interface Props {
  vedtakDate: ISODate | null;
  title: string;
}

export const VedtakDate = ({ title, vedtakDate }: Props) => {
  const { ankeskjema } = useTranslation();

  return (
    <InformationPointBox header={title}>
      <BodyShort>{dateDisplayWithFallbackText(vedtakDate, ankeskjema.summary.sections.case.no_date)}</BodyShort>
    </InformationPointBox>
  );
};
