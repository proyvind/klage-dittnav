import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { ReadOnlyKlage } from '../types/klage';
import { Vedlegg } from '../types/vedlegg';

export interface Store {
    loading: boolean;
    chosenTema: string | null;
    chosenYtelse: string;
    person: Bruker | null;
    klage: ReadOnlyKlage | null;
    vedlegg: Vedlegg[];
    getKlageError: boolean;
}

export const initialState: Store = {
    loading: true,
    chosenTema: null,
    chosenYtelse: '',
    person: null,
    klage: null,
    vedlegg: [],
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
                person: action.value
            };
        case 'CHECK_AUTH_ERROR':
            return {
                ...state,
                loading: false
            };
        case 'KLAGE_POST_SUCCESS':
            return {
                ...state,
                klage: action.value,
                chosenTema: action.value.tema,
                chosenYtelse: action.value.ytelse,
                vedlegg: action.value.vedlegg
            };
        case 'KLAGE_GET_SUCCESS':
            return {
                ...state,
                klage: action.value,
                chosenYtelse: action.value.ytelse,
                chosenTema: action.value.tema,
                vedlegg: action.value.vedlegg
            };
        case 'KLAGE_UPDATE':
            if (state.klage === null) {
                return state;
            }
            return {
                ...state,
                klage: {
                    ...state.klage,
                    ...action.value
                }
            };
        case 'KLAGE_GET_ERROR':
            return { ...state, getKlageError: true };
        case 'VEDLEGG_ADD_SUCCESS':
            return { ...state, vedlegg: [...state.vedlegg, action.value] };
        case 'VEDLEGG_REMOVE':
            return {
                ...state,
                vedlegg: state.vedlegg.filter(vedlegg => vedlegg.id.toString() !== action.value.id)
            };
        case 'YTELSE_SET':
            return {
                ...state,
                chosenYtelse: action.value
            };
        case 'SET_FINALIZED_DATE':
            if (state.klage === null) {
                return state;
            }
            return {
                ...state,
                klage: {
                    ...state.klage,
                    finalizedDate: action.value
                }
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
