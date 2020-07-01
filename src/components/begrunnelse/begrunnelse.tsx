import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import {
    MarginContainer,
    CenteredContainer,
    FlexCenteredContainer
} from '../../styled-components/main-styled-components';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VEDLEGG_STATUS, VedleggProps } from '../../types/vedlegg';
import VedleggVisning from './vedlegg';
import { postNewKlage, updateKlage } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../store/reducer';
import { addVedleggToKlage, deleteVedlegg } from '../../services/fileService';
import { Klage, constructKlage } from '../../types/klage';
import { toISOString } from '../../utils/date-util';

const Begrunnelse = (props: any) => {
    const dispatch = useDispatch();
    const { activeKlage, activeVedlegg } = useSelector((state: Store) => state);

    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>(activeKlage.fritekst ?? '');
    const [activeDatoISO, setActiveDatoISO] = useState<string>(
        activeKlage.vedtaksdato ? toISOString(activeKlage.vedtaksdato) : toISOString(new Date())
    );

    useEffect(() => {
        const erFamilieOgPensjonEnhet = (): boolean => {
            // TODO: Litt midlertidlig losning
            return ['foreldrepenger', 'engangsstonad', 'svangerskapspenger'].indexOf(props.ytelse) > -1;
        };

        if (!activeKlage || !activeKlage.id) {
            let klage: Klage;
            if (props.chosenVedtak) {
                klage = constructKlage(props.chosenVedtak);
                setActiveDatoISO(props.chosenVedtak.vedtaksdato);
            } else {
                klage = {
                    fritekst: activeBegrunnelse,
                    tema: erFamilieOgPensjonEnhet() ? 'FOR' : '',
                    enhetId: erFamilieOgPensjonEnhet() ? 'FOP' : '',
                    vedtaksdato: new Date(activeDatoISO),
                    referanse: ''
                };
            }
            dispatch(postNewKlage(klage));
        }
    }, [activeKlage, dispatch, activeBegrunnelse, activeDatoISO, props.chosenVedtak, props.ytelse]);

    const INPUTDESCRIPTION =
        'Gjør rede for hvilken endring du ønsker i vedtaket, og beskriv hva du begrunner klagen med. Legg ved erklæringer eller bevis som du mener kan være til støtte for klagen.';

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
        for (let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                const formData = new FormData();
                const vedlegg = event.target.files[key];
                formData.append('vedlegg', vedlegg);

                addVedleggToKlage(activeKlage.id!!, formData)
                    .then(response => {
                        console.log(response);
                        dispatch({
                            type: 'VEDLEGG_ADD',
                            value: { status: VEDLEGG_STATUS.OK, vedlegg: response.data }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch({
                            type: 'VEDLEGG_ADD',
                            value: { status: VEDLEGG_STATUS.ERROR, message: 'error' }
                        });
                    });
            }
        }
    };

    const removeAttachment = (vedlegg: VedleggProps) => {
        console.log(vedlegg);
        deleteVedlegg(vedlegg.vedlegg)
            .then(response => {
                console.log(response);
                dispatch({
                    type: 'VEDLEGG_REMOVE',
                    value: vedlegg
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const submitBegrunnelseOgDato = (event: any) => {
        event.preventDefault();
        dispatch(
            updateKlage({
                ...activeKlage,
                fritekst: activeBegrunnelse,
                vedtaksdato: new Date(activeDatoISO)
            })
        );
        props.next();
    };

    return (
        <>
            <Undertittel>Begrunn klagen din</Undertittel>
            <Textarea
                name="begrunnelse"
                value={activeBegrunnelse}
                description={INPUTDESCRIPTION}
                placeholder="Skriv inn din begrunnelse her."
                onChange={e => setActiveBegrunnelse(e.target.value)}
                maxLength={0}
                textareaClass="expanded-height"
            />
            <MarginContainer>
                <Undertittel>Vedlegg</Undertittel>
                <MarginContainer>
                    <VedleggVisning vedlegg={activeVedlegg} deleteAction={vedlegg => removeAttachment(vedlegg)} />
                </MarginContainer>
                <MarginContainer>
                    <Knapp onClick={e => handleClick(e)}>Last opp nytt vedlegg</Knapp>
                    <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg, .pdf"
                        id="uploadbutton"
                        ref={fileInput}
                        onChange={e => uploadAttachment(e)}
                        style={{ display: 'none' }}
                    />
                </MarginContainer>
                <Normaltekst>
                    Om du har ny eller oppdatert informasjon du ønsker å legge ved kan det lastes opp her.
                </Normaltekst>
                <br />
                <Normaltekst>
                    All informasjon du har sendt inn tidligere i denne saken vil følge med klagen din og trenger ikke
                    lastes opp på nytt.
                </Normaltekst>
            </MarginContainer>

            <MarginContainer>
                <CenteredContainer>
                    <FlexCenteredContainer>
                        <Hovedknapp className="row-element" onClick={(event: any) => submitBegrunnelseOgDato(event)}>
                            Gå videre
                        </Hovedknapp>
                    </FlexCenteredContainer>
                </CenteredContainer>
            </MarginContainer>
        </>
    );
};

export default Begrunnelse;
