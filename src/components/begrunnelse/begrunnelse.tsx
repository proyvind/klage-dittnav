import React, { useState, useRef } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import VeilederInfo from '../general/veileder-info';
import { MarginContainer, ContainedContent } from '../../styled-components/main-styled-components';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
// import { addVedleggToKlage } from '../../services/fileService';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import godt_bilde_guide from '../../assets/images/godt_bilde_guide.svg';
import { Normaltekst } from 'nav-frontend-typografi';

const veilederText = (
    <>
        <Normaltekst>All informasjon du har sendt inn tidligere i denne saken vil følge med klagen din.</Normaltekst>
        <br />
        <Normaltekst>
            Om du har ny eller oppdatert informasjon du ønsker å legge ved kan det lastes opp her.
        </Normaltekst>
    </>
);

const ekspanderbartPanelTittel = (
    <Normaltekst>
        Ønsker du å legge ved et bilde? Av en legeerklæring eller lignende? Les denne veiledningen først.
    </Normaltekst>
);

const Begrunnelse = (props: any) => {
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>(props.activeBegrunnelse ?? '');
    const [activeVedlegg, setActiveVedlegg] = useState<File[]>(props.activeVedlegg ?? []);

    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = (event: any) => {
        event.preventDefault();
        let node = fileInput.current;
        if (node) {
            node?.click();
        } else {
            return;
        }
    };

    const uploadAttachment = (event: any) => {
        event.preventDefault();
        setActiveVedlegg(event.target.files);
    };

    const submitBegrunnelse = () => {
        return props.submitBegrunnelse(activeBegrunnelse);
    };

    const submitVedlegg = (id: number) => {
        props.submitVedlegg(id, activeVedlegg);
        // addVedleggToKlage(id, activeVedlegg);
    };

    const submitVedleggOgBegrunnelse = (event: any) => {
        event.preventDefault();
        submitVedlegg(1);
        submitBegrunnelse().then((res: any) => {
            // TODO
            console.log('do something with ', res);
            // submitVedlegg(activeVedlegg);
        });
    };

    return (
        <form onSubmit={(event: any) => submitVedleggOgBegrunnelse(event)}>
            <Textarea
                name="begrunnelse"
                value={activeBegrunnelse}
                label="Beskriv hvorfor du klager:"
                onChange={e => setActiveBegrunnelse(e.target.value)}
                maxLength={500}
            />

            <MarginContainer>
                <VeilederInfo tekst={veilederText} posisjon="høyre" />
            </MarginContainer>

            <MarginContainer>
                <Ekspanderbartpanel tittel={ekspanderbartPanelTittel}>
                    <ContainedContent>
                        <img src={godt_bilde_guide} alt="Slik tar du et godt bilde" />
                    </ContainedContent>
                </Ekspanderbartpanel>
            </MarginContainer>

            <div>
                {Array.from(activeVedlegg).map((vedlegg: File, index: number) => (
                    <div key={index}>{vedlegg.name}</div>
                ))}
            </div>

            <MarginContainer>
                <Knapp onClick={e => handleClick(e)}>Last opp nytt vedlegg</Knapp>
                <input
                    type="file"
                    multiple
                    accept="image/png, .pdf"
                    id="uploadbutton"
                    ref={fileInput}
                    onChange={e => uploadAttachment(e)}
                    style={{ display: 'none' }}
                />
            </MarginContainer>

            <MarginContainer>
                <Hovedknapp>Gå videre</Hovedknapp>
            </MarginContainer>
        </form>
    );
};

export default Begrunnelse;
