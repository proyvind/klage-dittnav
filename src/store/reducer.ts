import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { KlageSkjema, Klage } from '../types/klage';
import { VedleggProps } from '../types/vedlegg';
import {defaultYtelse} from "../utils/routes.config";

export interface Store {
    loading: boolean;

    chosenYtelse: string;

    // Auth response
    person: Bruker;

    activeKlage: Klage;

    activeKlageSkjema: KlageSkjema;

    activeVedlegg: VedleggProps[];
}

export const initialState: Store = {
    loading: true,

    chosenYtelse: defaultYtelse,

    person: {
        navn: {
            fornavn: '',
            etternavn: ''
        },
        adresse: {
            adressenavn: '',
            postnummer: '',
            poststed: ''
        },
        folkeregisteridentifikator: {
            type: '',
            identifikasjonsnummer: ''
        }
    },

    activeKlage: {
        fritekst: '',
        ytelse: '',
        tema: ''
    },

    activeKlageSkjema: {
        fritekst: '',
        ytelse: '',
        tema: '',
        datoalternativ: ''
    },

    activeVedlegg: []
};

const reducer = (state = initialState, action: ActionTypes): Store => {
    switch (action.type) {
        case 'CHECK_AUTH_SUCCESS':
            return {
                ...state,
                loading: false,
                person: action.payload
            };
        case 'CHECK_AUTH_ERROR':
            return {
                ...state,
                loading: false
            };
        case 'KLAGE_POST_SUCCESS':
            return {
                ...state,
                activeKlage: action.payload,
                activeKlageSkjema: { ...state.activeKlageSkjema, ...action.klageskjema, ...action.payload }
            };
        case 'VEDLEGG_ADD':
            return { ...state, activeVedlegg: [...state.activeVedlegg, action.value] };

        case 'VEDLEGG_REMOVE':
            const vIndex = state.activeVedlegg.indexOf(action.value);
            return {
                ...state,
                activeVedlegg: state.activeVedlegg.filter((_: any, index: number) => index !== vIndex)
            };
        case "YTELSE_SET":
            return {
                ...state,
                chosenYtelse: action.value
            };
    }
    return state;
};

export default reducer;
