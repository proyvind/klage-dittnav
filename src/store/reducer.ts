import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';
import { Klage } from '../types/klage';

export interface Store {
    loading: boolean;

    // Auth response
    person: Bruker;

    activeKlage: Klage;
}

export const initialState: Store = {
    loading: true,

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
        vedtaksdato: new Date()
    }
};

const reducer = (state = initialState, action: ActionTypes): Store => {
    switch (action.type) {
        case 'CHECK_AUTH_SUCCESS':
            console.log(action.payload);
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
                activeKlage: action.payload
            };
    }
    return state;
};

export default reducer;
