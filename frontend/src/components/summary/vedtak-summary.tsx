import { BodyShort } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { ISODate, isoDateToPretty } from '../../domain/date/date';
import { Language } from '../../language/language';
import { SpaceBetweenFlexListContainer } from '../../styled-components/common';
import { InformationPointBox } from '../information-point-box/information-point-box';

interface Props extends SaksnummerTextProps {
  vedtakDate: ISODate | null;
}

export const VedtakSummary = ({ vedtakDate, internalSaksnummer, translations, userSaksnummer }: Props) => (
  <SpaceBetweenFlexListContainer>
    <Saksnummer translations={translations} userSaksnummer={userSaksnummer} internalSaksnummer={internalSaksnummer} />
    <InformationPointBox header={translations.summary.sections.case.vedtak}>
      <BodyShort>{useDateToVedtakText(vedtakDate, translations.summary.sections.case.no_date)}</BodyShort>
    </InformationPointBox>
  </SpaceBetweenFlexListContainer>
);

interface SaksnummerTextProps {
  userSaksnummer?: string | null;
  internalSaksnummer?: string | null;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const SaksnummerText = ({ internalSaksnummer = null, translations, userSaksnummer = null }: SaksnummerTextProps) => {
  if (typeof userSaksnummer === 'string' && userSaksnummer.length !== 0) {
    return <BodyShort>{userSaksnummer}</BodyShort>;
  }

  if (internalSaksnummer !== null) {
    return <BodyShort>{`${internalSaksnummer} \u2013 ${translations.summary.sections.case.from_system}`}</BodyShort>;
  }

  return <BodyShort>{translations.summary.sections.case.not_specified}</BodyShort>;
};

type SaksnummerProps = SaksnummerTextProps;

const Saksnummer = (props: SaksnummerProps) => (
  <InformationPointBox header={props.translations.summary.sections.case.saksnummer}>
    <SaksnummerText {...props} />
  </InformationPointBox>
);

const useDateToVedtakText = (isoDate: ISODate | null, noDateText: string): string =>
  useMemo(() => {
    const prettyDate = isoDateToPretty(isoDate);

    if (prettyDate === null) {
      return noDateText;
    }

    return prettyDate;
  }, [isoDate, noDateText]);
