import { LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ISODateTime, isoDateTimeToPretty } from '../../date/date';
import { useTitleOrTemaName } from '../../hooks/use-titles';
import { LetterOpened } from '../../icons/letter-opened';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { Klage } from '../../redux-api/case/klage/types';
import { TemaKey } from '../../tema/tema';
import { IconLinkPanel } from '../icon-link-panel/icon-link-panel';
import { TextLoader } from '../text-loader/text-loader';

export const ApiKlage = (klage: Klage) => {
  const lang = useLanguage();

  return (
    <Klage
      titleKey={klage.titleKey}
      temaKey={klage.tema}
      modified={klage.modifiedByUser}
      to={`/${lang}/klage/${klage.id}/begrunnelse`}
    />
  );
};

interface Props {
  to: string;
  modified: ISODateTime;
  temaKey: TemaKey;
  titleKey?: string | null;
}

const Klage = ({ to, temaKey, titleKey, modified }: Props) => {
  const { common } = useTranslation();
  const [title, isLoading] = useTitleOrTemaName(temaKey, titleKey);

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
