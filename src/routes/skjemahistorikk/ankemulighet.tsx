import React from 'react';
import styled from 'styled-components/macro';
import { AnkemulighetStatus, AvailableAnke, AvailableAnkeStatus } from '../../store/anke/types/anke';
import { useTemaName } from '../../language/titles';
import { BaseLink } from '../../link/link';
import { useLanguage } from '../../language/use-language';
import { dateDisplayWithFallbackText } from '../../date/date';
import { useTranslation } from '../../language/use-translation';
import { MarginTopContainer } from '../../styled-components/common';

interface Props {
    ankemulighet: AvailableAnke;
}

export const Ankemulighet = ({ ankemulighet }: Props) => {
    const { ankeskjema } = useTranslation();
    const lang = useLanguage();
    return (
        <ListItem>
            <article>
                <Title>
                    {`Klage (${dateDisplayWithFallbackText(
                        ankemulighet.innsendtDate,
                        ankeskjema.summary.sections.case.no_date
                    )})`}
                </Title>
                <Content>
                    <Info>Tema: {useTemaName(ankemulighet.tema)}</Info>
                    <Info>
                        {`Dato vedtak: 
                        ${dateDisplayWithFallbackText(
                            ankemulighet.vedtakDate,
                            ankeskjema.summary.sections.case.no_date
                        )}`}
                    </Info>
                    <Info>Utfall: {ankemulighet.utfall}</Info>
                    <MarginTopContainer>
                        <BaseLink href={`/${lang}/anke/ny?saksnummer=${ankemulighet.ankeInternalSaksnummer}`}>
                            {getText(ankemulighet.ankeStatus)}
                        </BaseLink>
                    </MarginTopContainer>
                </Content>
            </article>
        </ListItem>
    );
};

const getText = (status: AvailableAnkeStatus) => {
    if (status === AnkemulighetStatus.OPEN) {
        return 'Klikk her for å anke';
    }

    return 'Fortsett påbegynt anke';
};

const Title = styled.h1`
    font-size: 1em;
`;

const Content = styled.div`
    padding-left: 1em;
`;

const Info = styled.div`
    display: list-item;
    list-style: disc;
    margin-left: 1em;
`;

const ListItem = styled.li`
    padding: 0;
    margin: 0;
    margin-top: 40px;
`;
