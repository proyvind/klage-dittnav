import React, { useMemo, useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components/macro';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { FnrInput, Label } from 'nav-frontend-skjema';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { InngangKategori, Kategori } from '../../kategorier/kategorier';
import { usePageInit } from '../../page-init/page-init';
import { MarginTopContainer } from '../../styled-components/common';
import { ContentContainer } from '../../styled-components/content-container';
import { InngangMainContainer } from '../../styled-components/main-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { SectionTitle } from '../../styled-components/section-title';
import { WhiteSection } from '../../styled-components/white-section';
import { User } from '../../user/user';
import { getFullName } from '../klageskjema/summary/personlige-opplysninger-summary';
import { foedselsnrFormat } from '../klageskjema/summary/text-formatting';
import { hasFullmaktFor } from '../../api/api';
import { TITLES, useTitleOrYtelse } from '../../language/titles';
import { Languages } from '../../language/language';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';

interface Props {
    kategori: Kategori;
    inngangkategori: InngangKategori;
}

const FieldWithButton = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-items: space-around;
    > * {
        flex-basis: 180px;
        margin: 10px 0;
    }
    justify-content: flex-start;
`;

const InngangFullmakt = ({ kategori, inngangkategori }: Props) => {
    const { titleKey, temaKey } = kategori;
    const title = useTitleOrYtelse(temaKey, titleKey);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.innsendingsvalg.fullmakt.title_postfix}`);
    const breadcrumbs = useMemo(() => getBreadcrumbs(inngangkategori, kategori, lang), [
        inngangkategori,
        kategori,
        lang
    ]);
    useBreadcrumbs(breadcrumbs, inngang.innsendingsvalg.fullmakt.title);

    const [fodselsnummer, setFodselsnummer] = useState<string>('');
    const [valid, setValid] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string>('');
    const [selectedFullmaktsgiver, setSelectedFullmaktsgiver] = useState<User | null>(null);

    const query = useMemo(
        () =>
            queryString.stringify(
                {
                    tema: temaKey,
                    titleKey,
                    fullmaktsgiver: fodselsnummer
                },
                {
                    skipNull: true,
                    skipEmptyString: true,
                    encode: true,
                    sort: false
                }
            ),
        [temaKey, titleKey, fodselsnummer]
    );

    const handleSubmit = async () => {
        if (!valid) {
            return;
        }
        setSubmit(true);
        setLoading(true);
        setFeilmelding('');
        setSelectedFullmaktsgiver(null);
        try {
            const user = await hasFullmaktFor(temaKey, fodselsnummer);
            setSelectedFullmaktsgiver(user);
            setLoading(false);
        } catch (error) {
            setFeilmelding(error.message);
            setLoading(false);
        }
    };

    return (
        <InngangMainContainer>
            <ContentContainer>
                <CenteredPageTitle>{title}</CenteredPageTitle>

                <WhiteSection>
                    <SectionTitle>{inngang.innsendingsvalg.fullmakt.who}</SectionTitle>
                    <Label htmlFor={'fodselsnummer-text'}>{inngang.innsendingsvalg.fullmakt.nin}</Label>
                    <FieldWithButton>
                        <div>
                            <FnrInput
                                id="fodselsnummer-text"
                                autoComplete="off"
                                bredde="S"
                                value={fodselsnummer ?? ''}
                                onChange={e => setFodselsnummer(e.target.value)}
                                onValidate={val => setValid(val)}
                                feil={submit && !valid ? inngang.innsendingsvalg.fullmakt.invalid_nin : undefined}
                            />
                        </div>
                        <div>
                            <Hovedknapp onClick={handleSubmit} spinner={loading} disabled={!valid}>
                                {inngang.innsendingsvalg.fullmakt.search}
                            </Hovedknapp>
                        </div>
                    </FieldWithButton>

                    {submit && feilmelding.length > 0 && (
                        <MarginTopContainer>
                            <AlertStripeFeil>{feilmelding}</AlertStripeFeil>
                        </MarginTopContainer>
                    )}

                    {selectedFullmaktsgiver && selectedFullmaktsgiver.folkeregisteridentifikator && (
                        <MarginTopContainer>
                            <Lenkepanel href={`/ny?${query}`} tittelProps="normaltekst" border>
                                {`${getFullName(selectedFullmaktsgiver)} (${foedselsnrFormat(
                                    selectedFullmaktsgiver.folkeregisteridentifikator.identifikasjonsnummer
                                )})`}
                            </Lenkepanel>
                        </MarginTopContainer>
                    )}
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const getBreadcrumbs = (inngangkategori: InngangKategori, kategori: Kategori, lang: Languages): Breadcrumb[] => [
    {
        title: inngangkategori.title[lang],
        url: `/${lang}/${inngangkategori.path}`,
        handleInApp: true
    },
    {
        title: TITLES.getTitle(kategori.titleKey, lang),
        url: `/${lang}/${inngangkategori.path}/${kategori.path}`,
        handleInApp: true
    }
];

export default InngangFullmakt;
