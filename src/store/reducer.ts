import { ActionTypes } from './actions';
import { Bruker } from '../types/bruker';

export interface Store {
    loading: boolean;

    // Auth response
    person: Bruker;
}

export const initialState: Store = {
    loading: true,

    person: {
        id: '',
        foedselsnummer: '',
        navn: {
            fornavn: '',
            etternavn: ''
        },
        adresse: {
            adressenavn: '',
            postnummer: '',
            poststed: ''
        }
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
    }
    return state;
};

export default reducer;
