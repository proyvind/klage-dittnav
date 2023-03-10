import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISODateTime, isoDateTimeToPretty } from '../../domain/date/date';
import { useInnsendingsytelseName } from '../../hooks/use-innsendingsytelser';
import { LetterOpened } from '../../icons/letter-opened';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { Klage } from '../../redux-api/case/klage/types';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';
import { TextLoader } from '../text-loader/text-loader';

export const ApiKlage = (klage: Klage) => {
  const lang = useLanguage();

  return (
    <Klage
      innsendingsytelse={klage.innsendingsytelse}
      modified={klage.modifiedByUser}
      to={`/${lang}/klage/${klage.id}/begrunnelse`}
    />
  );
};

interface Props {
  to: string;
  modified: ISODateTime;
  innsendingsytelse: Innsendingsytelse;
}

const Klage = ({ to, innsendingsytelse, modified }: Props) => {
  const { common } = useTranslation();
  const [title, isLoading] = useInnsendingsytelseName(innsendingsytelse);

  return (
    <IconLinkPanel icon={<LetterOpened aria-hidden />} as={Link} to={to} border>
      <LinkPanel.Title>
        <TextLoader isLoading={isLoading}>{title}</TextLoader>
      </LinkPanel.Title>
      <LinkPanel.Description>
        {common.last_changed}: {isoDateTimeToPretty(modified)}
      </LinkPanel.Description>
    </IconLinkPanel>
  );
};
