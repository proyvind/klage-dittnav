import React, {useState, useRef, useReducer} from 'react';
import { Textarea } from 'nav-frontend-skjema';
import VeilederInfo from '../general/veileder-info';
import { MarginContainer, ContainedContent } from '../../styled-components/main-styled-components';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
// import { addVedleggToKlage } from '../../services/fileService';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import godt_bilde_guide from '../../assets/images/godt_bilde_guide.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { getAddVedleggUrl } from "../../clients/apiUrls";
import {VEDLEGG_STATUS, VedleggProps} from "../../types/vedlegg";
import VedleggVisning from "./vedlegg";

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
    const [activeVedlegg, dispatch] = useReducer((activeVedlegg: VedleggProps[], {type, value}: any) => {
        switch (type) {
            case "add":
                return [...activeVedlegg, value];
            case "remove":
                return activeVedlegg.filter((_: any, index: number) => index !== value);
            default:
                return activeVedlegg;
        }
    }, []);

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
        for(let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                const formData = new FormData();
                const vedlegg = event.target.files[key];
                formData.append('tittel', vedlegg.name);
                formData.append('content', vedlegg);

                fetch(getAddVedleggUrl(1), {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    console.log(response);
                    dispatch({type: 'add', value: {status: VEDLEGG_STATUS.OK, file: vedlegg}})
                }).catch(err => {
                    console.log(err);
                    dispatch({type: 'add', value: {status: VEDLEGG_STATUS.ERROR, message: 'error', file: vedlegg}})
                })
            }
        }
    };

    const removeAttachment = (vedlegg: VedleggProps) => {
        dispatch({type: 'remove', value: vedlegg});
    }

    const submitBegrunnelse = () => {
        return props.submitBegrunnelse(activeBegrunnelse);
    };

    const submitVedleggOgBegrunnelse = (event: any) => {
        event.preventDefault();
        // submitVedlegg(1); TODO: Remove call and rename method, upload is done
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
                {Array.from(activeVedlegg).map((vedlegg: VedleggProps, index: number) => (
                    <VedleggVisning key={index} vedlegg={vedlegg} deleteAction={() => removeAttachment(vedlegg)} />
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
