import { ActionTypes } from './actions';

export interface Store {
    loading: boolean;

    // Auth response
    userFirstName: string;
    userLastName: string;
    userAdress: string;
}

export const initialState: Store = {
    loading: true,

    userFirstName: '',
    userLastName: '',
    userAdress: ''
};

const reducer = (state = initialState, action: ActionTypes): Store => {
    switch (action.type) {
        case 'CHECK_AUTH_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                userFirstName: action.payload.userFirstName,
                userLastName: action.payload.userLastName,
                userAdress: action.payload.userAdress
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
