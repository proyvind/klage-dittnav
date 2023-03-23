import { BodyShort } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { ISODate, isoDateToPretty } from '@app/domain/date/date';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { useKlageenheterForAnke } from '@app/simple-api-state/use-kodeverk';
import { SpaceBetweenFlexListContainer } from '@app/styled-components/common';
import { InformationPointBox } from '../information-point-box/information-point-box';

interface BaseProps extends SaksnummerTextProps {
  vedtakDate: ISODate | null;
}

interface KlageProps extends BaseProps {
  type: 'klage';
}

interface AnkeProps extends BaseProps {
  type: 'anke';
  enhetsnummer: string | null;
}

export const VedtakSummary = ({
  vedtakDate,
  internalSaksnummer,
  translations,
  userSaksnummer,
  ...props
}: KlageProps | AnkeProps) => (
  <SpaceBetweenFlexListContainer>
    <Saksnummer translations={translations} userSaksnummer={userSaksnummer} internalSaksnummer={internalSaksnummer} />
    <InformationPointBox header={translations.summary.sections.case.vedtak}>
      <BodyShort>{useDateToVedtakText(vedtakDate, translations.summary.sections.case.no_date)}</BodyShort>
    </InformationPointBox>
    {props.type === 'anke' ? <Klageenhet enhetsnummer={props.enhetsnummer} /> : null}
  </SpaceBetweenFlexListContainer>
);

interface KlageenhetProps {
  enhetsnummer: string | null;
}

const Klageenhet = ({ enhetsnummer }: KlageenhetProps) => {
  const { ankeskjema } = useTranslation();
  const name = useKlageenhetName(enhetsnummer);

  return (
    <InformationPointBox header={ankeskjema.summary.sections.case.klageenhet}>
      <BodyShort>{name}</BodyShort>
    </InformationPointBox>
  );
};

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

const useKlageenhetName = (id: string | null): string => {
  const { data, isLoading } = useKlageenheterForAnke();
  const { ankeskjema } = useTranslation();

  if (id === null) {
    return ankeskjema.summary.sections.case.not_specified;
  }

  if (isLoading || typeof data === 'undefined') {
    return '';
  }

  return data.find((enhet) => enhet.id === id)?.navn ?? id;
};
