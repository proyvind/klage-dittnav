import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { ReadOnlyKlage } from '../types/klage';
import { Vedlegg } from '../types/vedlegg';

export interface Store {
    loading: boolean;
    person: Bruker | null;
    klage: ReadOnlyKlage | null;
    vedlegg: Vedlegg[];
    getKlageError: boolean;
}

export const initialState: Store = {
    loading: true,
    person: null,
    klage: null,
    vedlegg: [],
    getKlageError: false
};

const reducer = (state = initialState, action: ActionTypes): Store => {
    switch (action.type) {
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
        case 'KLAGE_SET':
            return {
                ...state,
                klage: action.value,
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
