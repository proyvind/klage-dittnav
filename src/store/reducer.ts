import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { KlageSkjema, Klage, klageToKlageSkjema } from '../types/klage';
import { Vedlegg } from '../types/vedlegg';

export interface Store {
    loading: boolean;

    chosenTema: string;

    chosenYtelse: string;

    // Auth response
    person: Bruker;

    activeKlage: Klage;

    activeKlageSkjema: KlageSkjema;

    activeVedlegg: Vedlegg[];

    klageId: string;

    getKlageError: boolean;
}

export const initialState: Store = {
    loading: true,

    chosenTema: '',
    chosenYtelse: '',

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
        id: 0,
        tema: '',
        vedlegg: [],
        vedtak: '',
        ytelse: ''
    },

    activeKlageSkjema: {
        datoalternativ: '',
        fritekst: '',
        tema: '',
        vedlegg: [],
        ytelse: ''
    },

    activeVedlegg: [],

    klageId: '',

    getKlageError: false
};

const reducer = (state = initialState, action: ActionTypes): Store => {
    switch (action.type) {
        case 'TEMA_SET':
            return {
                ...state,
                chosenTema: action.value
            };
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
        case 'KLAGE_GET_SUCCESS':
            return {
                ...state,
                activeKlage: action.payload,
                activeKlageSkjema: klageToKlageSkjema(action.payload),
                chosenYtelse: action.payload.ytelse,
                chosenTema: action.payload.tema,
                activeVedlegg: action.payload.vedlegg,
                klageId: action.payload.id?.toString() ?? initialState.klageId
            };
        case 'KLAGE_GET_ERROR':
            return { ...state, getKlageError: true };
        case 'VEDLEGG_ADD_SUCCESS':
            return { ...state, activeVedlegg: [...state.activeVedlegg, action.value] };
        case 'VEDLEGG_REMOVE':
            return {
                ...state,
                activeVedlegg: state.activeVedlegg.filter(vedlegg => vedlegg.id.toString() !== action.value.id)
            };
        case 'YTELSE_SET':
            return {
                ...state,
                chosenYtelse: action.value
            };

        case 'KLAGE_ID_SET':
            return {
                ...state,
                klageId: action.value
            };
        default:
            return state;
    }
};

export default reducer;
