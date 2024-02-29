import { BodyShort } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { ISODate, isoDateToPretty } from '@app/domain/date/date';
import { useTranslation } from '@app/language/use-translation';
import { Case, CaseType } from '@app/redux-api/case/types';
import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';
import { SpaceBetweenFlexListContainer } from '@app/styled-components/common';
import { InformationPointBox } from '../../../information-point-box/information-point-box';

export const VedtakSummary = ({
  vedtakDate,
  internalSaksnummer,
  userSaksnummer,
  enhetsnummer,
  caseIsAtKA,
  type,
}: Case | ISessionCase) => {
  const { skjema, common } = useTranslation();

  const hasEnhet = useMemo(() => {
    if (enhetsnummer === null) {
      return false;
    }

    if (type === CaseType.ANKE || type === CaseType.ETTERSENDELSE_ANKE) {
      return true;
    }

    if (type === CaseType.ETTERSENDELSE_KLAGE) {
      return caseIsAtKA === true;
    }

    return false;
  }, [caseIsAtKA, enhetsnummer, type]);

  return (
    <SpaceBetweenFlexListContainer>
      <Saksnummer userSaksnummer={userSaksnummer} internalSaksnummer={internalSaksnummer} />
      <InformationPointBox header={skjema.summary.sections.case.vedtak[type]}>
        <BodyShort>{useDateToVedtakText(vedtakDate, common.not_specified)}</BodyShort>
      </InformationPointBox>
      {hasEnhet ? <Klageenhet enhetsnummer={enhetsnummer} /> : null}
    </SpaceBetweenFlexListContainer>
  );
};

interface KlageenhetProps {
  enhetsnummer: string | null;
}

const Klageenhet = ({ enhetsnummer }: KlageenhetProps) => {
  const { skjema } = useTranslation();
  const name = useKlageenhetName(enhetsnummer);

  return (
    <InformationPointBox header={skjema.summary.sections.case.klageenhet}>
      <BodyShort>{name}</BodyShort>
    </InformationPointBox>
  );
};

interface SaksnummerTextProps {
  userSaksnummer?: string | null;
  internalSaksnummer?: string | null;
}

const SaksnummerText = ({ internalSaksnummer = null, userSaksnummer = null }: SaksnummerTextProps) => {
  const { skjema, common } = useTranslation();

  if (typeof userSaksnummer === 'string' && userSaksnummer.length !== 0) {
    return <BodyShort>{userSaksnummer}</BodyShort>;
  }

  if (internalSaksnummer !== null) {
    return <BodyShort>{`${internalSaksnummer} \u2013 ${skjema.summary.sections.case.from_system}`}</BodyShort>;
  }

  return <BodyShort>{common.not_specified}</BodyShort>;
};

const Saksnummer = (props: SaksnummerTextProps) => {
  const { skjema } = useTranslation();

  return (
    <InformationPointBox header={skjema.summary.sections.case.saksnummer}>
      <SaksnummerText {...props} />
    </InformationPointBox>
  );
};

const useDateToVedtakText = (isoDate: ISODate | null, noDateText: string): string =>
  useMemo(() => {
    const prettyDate = isoDateToPretty(isoDate);

    if (prettyDate === null) {
      return noDateText;
    }

    return prettyDate;
  }, [isoDate, noDateText]);

const useKlageenhetName = (id: string | null): string => {
  const { data, isLoading } = useKlageenheter();
  const { common } = useTranslation();

  if (id === null) {
    return common.not_specified;
  }

  if (isLoading || data === undefined) {
    return '';
  }

  return data.find((enhet) => enhet.id === id)?.navn ?? id;
};
