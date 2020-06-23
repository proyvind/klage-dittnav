import { Dispatch } from 'react';
import { getLoginserviceRedirectUrl, getUserDataUrl } from '../clients/apiUrls';
import { Klage } from '../types/klage';
import { postKlage, putKlage } from '../services/klageService';
import { VedleggProps } from '../types/vedlegg';

export type ActionTypes =
    | {
          type: 'CHECK_AUTH_ERROR';
      }
    | {
          type: 'CHECK_AUTH_SUCCESS';
          payload: any;
      }
    | {
          type: 'KLAGE_POST_SUCCESS';
          payload: Klage;
      }
    | {
          type: 'VEDLEGG_ADD';
          value: VedleggProps;
      }
    | {
          type: 'VEDLEGG_REMOVE';
          value: any;
      };

export function checkAuth() {
    return function (dispatch: Dispatch<ActionTypes>) {
        return fetch(getUserDataUrl(), {
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

export function postNewKlage(klage: Klage) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return postKlage(klage)
            .then(response => {
                console.log('Response from server', response);
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response });
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function updateKlage(klage: Klage) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return putKlage(klage)
            .then(response => {
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response });
            })
            .catch(err => {
                console.log(err);
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
