import { ActionTypes } from './actions';
import {Person} from "../types/person";

export interface Store {
    loading: boolean;

    // Auth response
    person: Person
}

export const initialState: Store = {
    loading: true,

    person: {
        firsName: '',
        lastName: '',
        id: '',
        phoneNumber: '',
        adress: {
            street: '',
            postalCode: '',
            city: ''
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
