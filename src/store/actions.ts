import { Dispatch } from 'react';
import { getLoginserviceRedirectUrl, getUserDataUrl } from '../clients/apiUrls';
import { Klage, klageSkjemaTilKlage, KlageSkjema } from '../types/klage';
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
          klageskjema: KlageSkjema;
      }
    | {
          type: 'VEDLEGG_ADD';
          value: VedleggProps;
      }
    | {
          type: 'VEDLEGG_REMOVE';
          value: any;
      }
    | {
          type: 'YTELSE_SET';
          value: string;
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

export function postNewKlage(klageskjema: KlageSkjema) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return postKlage(klageSkjemaTilKlage(klageskjema))
            .then(response => {
                console.log('Response from server', response);
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response, klageskjema: klageskjema });
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function updateKlage(klageskjema: KlageSkjema) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return putKlage(klageSkjemaTilKlage(klageskjema))
            .then(response => {
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response, klageskjema: klageskjema });
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function setValgtYtelse(ytelse: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return dispatch({type: "YTELSE_SET", value: ytelse});
    }
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
