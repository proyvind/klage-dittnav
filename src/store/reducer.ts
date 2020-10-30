import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { KlageSkjema, Klage, klageToKlageSkjema } from '../types/klage';
import { Vedlegg } from '../types/vedlegg';
import { DatoValg } from '../components/begrunnelse/datoValg';

export interface Store {
    loading: boolean;

    chosenTema: string | null;

    chosenYtelse: string;

    // Auth response
    person: Bruker | null;

    activeKlage?: Klage;

    activeKlageSkjema: KlageSkjema;

    activeVedlegg: Vedlegg[];

    klageId?: string;

    getKlageError: boolean;

    finalizedDate: string | null;
}

export const initialState: Store = {
    loading: true,

    chosenTema: null,
    chosenYtelse: '',

    person: null,

    activeKlageSkjema: {
        id: null,
        datoalternativ: DatoValg.INGEN,
        fritekst: '',
        tema: '',
        vedlegg: [],
        ytelse: '',
        saksnummer: null,
        vedtak: null
    },

    activeVedlegg: [],

    getKlageError: false,

    finalizedDate: null
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
        case 'KLAGE_FORM_SET':
            return {
                ...state,
                chosenTema: action.klageSkjema.tema,
                chosenYtelse: action.klageSkjema.ytelse,
                activeKlageSkjema: action.klageSkjema
            };
        case 'KLAGE_POST_SUCCESS':
            return {
                ...state,
                klageId: action.payload.id.toString(),
                activeKlage: action.payload,
                chosenTema: action.payload.tema,
                chosenYtelse: action.payload.ytelse,
                activeVedlegg: action.payload.vedlegg,
                activeKlageSkjema: {
                    ...state.activeKlageSkjema,
                    ...action.klageskjema,
                    ...klageToKlageSkjema(action.payload)
                }
            };
        case 'KLAGE_GET_SUCCESS':
            return {
                ...state,
                activeKlage: action.payload,
                activeKlageSkjema: klageToKlageSkjema(action.payload),
                chosenYtelse: action.payload.ytelse,
                chosenTema: action.payload.tema,
                activeVedlegg: action.payload.vedlegg,
                klageId: action.payload.id?.toString()
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
        case 'SET_FINALIZED_DATE':
            return {
                ...state,
                finalizedDate: action.value
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.value
            };
        default:
            return state;
    }
};

export default reducer;
