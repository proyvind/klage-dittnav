import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import VeilederInfo from '../general/veileder-info';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

const veilederText = `All informasjon du har sendt inn tidligere i denne saken vil følge med klagen din. Om du har ny eller oppdatert informasjon du ønsker å legge ved kan det lastes opp her.`;

const Begrunnelse = (props: any) => {
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>('');

    const uploadAttachment = (event: any) => {
        event.preventDefault();
        // TODO
    };

    const submitBegrunnelse = (event: any, activeBegrunnelse: string) => {
        event.preventDefault();
        props.submitBegrunnelse(activeBegrunnelse);
        // TODO
    };

    return (
        <form onSubmit={(event: any) => submitBegrunnelse(event, activeBegrunnelse)}>
            <Textarea
                name="begrunnelse"
                value={activeBegrunnelse}
                description="Klage på [kategori] - beskriv hvorfor du klager:"
                onChange={e => setActiveBegrunnelse(e.target.value)}
                maxLength={500}
            />

            <MarginContentContainer>
                <VeilederInfo tekst={veilederText} posisjon="høyre" />
            </MarginContentContainer>

            <MarginContentContainer>
                <CenteredContentContainer>
                    <Knapp onClick={uploadAttachment}>Last opp nytt vedlegg</Knapp>
                </CenteredContentContainer>
            </MarginContentContainer>

            <MarginContentContainer>
                <CenteredContentContainer>
                    <Hovedknapp>Gå videre</Hovedknapp>
                </CenteredContentContainer>
            </MarginContentContainer>
        </form>
    );
};

export default Begrunnelse;
