import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { KlageSkjema, Klage, klageTilKlageSkjema } from '../types/klage';
import { toVedleggProps, VEDLEGG_STATUS, VedleggProps } from '../types/vedlegg';

export interface Store {
    loading: boolean;

    chosenYtelse: string;

    // Auth response
    person: Bruker;

    activeKlage: Klage;

    activeKlageSkjema: KlageSkjema;

    activeVedlegg: VedleggProps[];

    klageId: string;

    getKlageError: boolean;
}

export const initialState: Store = {
    loading: true,

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
        tema: '',
        ytelse: ''
    },

    activeKlageSkjema: {
        fritekst: '',
        tema: '',
        ytelse: '',
        datoalternativ: ''
    },

    activeVedlegg: [],

    klageId: '',

    getKlageError: false
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
                activeKlageSkjema: { ...state.activeKlageSkjema, ...action.klageskjema, ...action.payload },
                klageId: action.payload.id?.toString() ?? initialState.klageId
            };
        case 'KLAGE_GET_SUCCESS':
            const incomingVedlegg = action.payload.vedlegg?.map(function (e): VedleggProps {
                return {
                    id: e.id.toString(),
                    klageId: e.klageId,
                    status: VEDLEGG_STATUS.OK,
                    vedlegg: toVedleggProps(e)
                };
            });

            return {
                ...state,
                activeKlage: action.payload,
                activeKlageSkjema: klageTilKlageSkjema(action.payload),
                chosenYtelse: action.payload.ytelse,
                activeVedlegg: incomingVedlegg!!,
                klageId: action.payload.id?.toString() ?? initialState.klageId
            };
        case 'KLAGE_GET_ERROR':
            return { ...state, getKlageError: true };
        case 'VEDLEGG_ADD_SUCCESS':
            return { ...state, activeVedlegg: [...state.activeVedlegg, action.value] };
        case 'VEDLEGG_REMOVE':
            const vIndex = state.activeVedlegg.indexOf(action.value);
            return {
                ...state,
                activeVedlegg: state.activeVedlegg.filter((_, index) => index !== vIndex)
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
    }
    return state;
};

export default reducer;
