import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISODateTime, isoDateTimeToPretty } from '../../domain/date/date';
import { useInnsendingsytelseName } from '../../hooks/use-innsendingsytelser';
import { LawBook } from '../../icons/law-book';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { Anke } from '../../redux-api/case/anke/types';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';
import { TextLoader } from '../text-loader/text-loader';

export const ApiAnke = (anke: Anke) => {
  const lang = useLanguage();

  return (
    <Anke
      innsendingsytelse={anke.innsendingsytelse}
      modified={anke.modifiedByUser}
      to={`/${lang}/anke/${anke.id}/begrunnelse`}
    />
  );
};

interface Props {
  to: string;
  modified: ISODateTime;
  innsendingsytelse: Innsendingsytelse;
}

const Anke = ({ to, modified, innsendingsytelse }: Props) => {
  const { common } = useTranslation();
  const [title, isLoading] = useInnsendingsytelseName(innsendingsytelse);

  return (
    <IconLinkPanel icon={<LawBook aria-hidden />} as={Link} to={to} border>
      <LinkPanel.Title>
        <TextLoader isLoading={isLoading}>{title}</TextLoader>
      </LinkPanel.Title>
      <LinkPanel.Description>
        {common.last_changed}: {isoDateTimeToPretty(modified)}
      </LinkPanel.Description>
    </IconLinkPanel>
  );
};
