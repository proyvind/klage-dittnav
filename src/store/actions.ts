import { Dispatch } from 'react';
import { getLoginserviceRedirectUrl, getUser } from '../clients/apiUrls';

export type ActionTypes =
    | {
          type: 'CHECK_AUTH_ERROR';
      }
    | {
          type: 'CHECK_AUTH_SUCCESS';
          payload: any;
      };

export function checkAuth() {
    return function (dispatch: Dispatch<ActionTypes>) {
        return fetch(getUser(), {
            method: 'GET',
            credentials: 'include'
        })
            .then(sjekkAuth)
            .then(sjekkHttpFeil)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: json });
            })
            .catch(error => {
                if (error !== 401 && error !== 403) {
                    dispatch({ type: 'CHECK_AUTH_ERROR' });
                    console.error(error);
                }
            });
    };
}

const sjekkAuth = (response: Response): any => {
    if (response.status === 401 || response.status === 403) {
        window.location.assign(getLoginserviceRedirectUrl());
    }
    return response;
};

const sjekkHttpFeil = (response: Response) => {
    if (response.ok) {
        return response;
    } else {
        throw response.status;
    }
};
