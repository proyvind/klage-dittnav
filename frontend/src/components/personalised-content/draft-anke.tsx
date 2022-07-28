import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISODateTime, isoDateTimeToPretty } from '../../date/date';
import { useTitleOrTemaName } from '../../hooks/use-titles';
import { LawBook } from '../../icons/law-book';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { Anke } from '../../redux-api/case/anke/types';
import { TemaKey } from '../../tema/tema';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';
import { TextLoader } from '../text-loader/text-loader';

export const ApiAnke = (anke: Anke) => {
  const lang = useLanguage();

  return <Anke temaKey={anke.tema} modified={anke.modifiedByUser} to={`/${lang}/anke/${anke.id}/begrunnelse`} />;
};

interface Props {
  to: string;
  modified: ISODateTime;
  temaKey: TemaKey;
  titleKey?: string | null;
}

const Anke = ({ to, modified, titleKey, temaKey }: Props) => {
  const { common } = useTranslation();
  const [title, isLoading] = useTitleOrTemaName(temaKey, titleKey);

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
