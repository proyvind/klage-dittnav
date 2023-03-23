import { Edit } from '@navikt/ds-icons';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { Language } from '@app/language/language';
import { UserSaksnummer } from '../common/saksnummer';

interface SaksnummerProps {
  internalSaksnummer: string | null;
  userSaksnummer?: string | null;
  translations: Language['klageskjema' | 'ankeskjema'];
  onChange: (saksnummer: string) => void;
}

export const Saksnummer = ({ translations, internalSaksnummer, ...props }: SaksnummerProps) => {
  if (typeof internalSaksnummer === 'string') {
    const onClick = () => props.onChange(internalSaksnummer);

    return (
      <div>
        <Label>{translations.begrunnelse.saksnummer.internalTitle}</Label>
        <Row>
          <BodyShort>{internalSaksnummer}</BodyShort>
          <Button
            title={translations.begrunnelse.saksnummer.change}
            onClick={onClick}
            size="small"
            icon={<Edit aria-hidden />}
            variant="tertiary"
          />
        </Row>
      </div>
    );
  }

  return <UserSaksnummer {...props} label={translations.begrunnelse.saksnummer.title} />;
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;
