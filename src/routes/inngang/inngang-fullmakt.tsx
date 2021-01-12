import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { FnrInput, Label } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
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
import queryString from 'query-string';
import { hasFullmaktFor } from '../../api/api';

interface Props {
    inngangkategori: InngangKategori;
    kategori: Kategori;
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

const InngangFullmakt = ({ inngangkategori, kategori }: Props) => {
    const { title, temaKey } = kategori;
    usePageInit(`${title} \u2013 klage på vegne av andre`);
    useBreadcrumbs([], 'Klage på vegne av andre');

    const [personnummer, setPersonnummer] = useState<string | number | readonly string[] | undefined>('');
    const [valid, setValid] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string>('');
    const [selectedFullmaktsgiver, setSelectedFullmaktsgiver] = useState<User | null>(null);

    // const temaKey = ensureStringIsTema(getTemaKeyFromPath(window.location.pathname.split('/')[2]));

    const query = queryString.stringify(
        {
            tema: temaKey,
            tittel: title,
            fullmaktsgiver: personnummer
        },
        {
            skipNull: true
        }
    );

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e);
        setSubmit(true);
        setLoading(true);
        setFeilmelding('');
        setSelectedFullmaktsgiver(null);
        if (temaKey !== null && personnummer) {
            try {
                await hasFullmaktFor(temaKey, +personnummer).then(user => {
                    setSelectedFullmaktsgiver(user);
                    setLoading(false);
                });
            } catch (error) {
                setFeilmelding(error.message);
                setLoading(false);
            }
        }
    };

    if (!temaKey) {
        <AlertStripeFeil>Ikke gyldig URL</AlertStripeFeil>;
    }

    return (
        <InngangMainContainer>
            <ContentContainer>
                <CenteredPageTitle>{inngangkategori.title}</CenteredPageTitle>

                <WhiteSection>
                    <SectionTitle>Hvem klager du på vegne av?</SectionTitle>
                    <Label htmlFor={'personnummer-text'}>Personnummer for den du har fullmakt til (11 siffer)</Label>
                    <FieldWithButton>
                        <div>
                            <FnrInput
                                id="personnummer-text"
                                autoComplete="off"
                                bredde="S"
                                value={personnummer}
                                onChange={e => setPersonnummer(e.target.value)}
                                onValidate={val => setValid(val)}
                                feil={submit && !valid ? 'Ugyldig personnummer' : undefined}
                            />
                        </div>
                        <div>
                            <Hovedknapp
                                onClick={e => {
                                    valid && handleSubmit(e);
                                }}
                                spinner={loading}
                                disabled={!valid}
                            >
                                Søk
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
                                {`${getFullName(selectedFullmaktsgiver)} \u2013 f. nr ${foedselsnrFormat(
                                    selectedFullmaktsgiver.folkeregisteridentifikator.identifikasjonsnummer
                                )}`}
                            </Lenkepanel>
                        </MarginTopContainer>
                    )}
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

export default InngangFullmakt;
