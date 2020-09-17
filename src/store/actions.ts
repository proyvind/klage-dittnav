import { Dispatch } from 'react';
import { getLoginserviceRedirectUrl, getUserDataUrl } from '../clients/apiUrls';
import { Klage, KlageSkjema, klageSkjemaToKlage, klageSkjemaToKlageDraft } from '../types/klage';
import { postKlage, putKlage, getKlage } from '../services/klageService';
import { Vedlegg, VedleggFile } from '../types/vedlegg';
import { Bruker } from '../types/bruker';
import { logError } from '../utils/logger/frontendLogger';

export type ActionTypes =
    | {
          type: 'CHECK_AUTH_ERROR';
      }
    | {
          type: 'CHECK_AUTH_SUCCESS';
          payload: Bruker;
      }
    | {
          type: 'KLAGE_POST_SUCCESS';
          payload: Klage;
          klageskjema: KlageSkjema;
      }
    | {
          type: 'KLAGE_GET_SUCCESS';
          payload: Klage;
      }
    | {
          type: 'KLAGE_GET_ERROR';
      }
    | {
          type: 'VEDLEGG_ADD_SUCCESS';
          value: Vedlegg;
      }
    | {
          type: 'VEDLEGG_REMOVE';
          value: VedleggFile;
      }
    | {
          type: 'YTELSE_SET';
          value: string;
      }
    | {
          type: 'TEMA_SET';
          value: string;
      }
    | {
          type: 'KLAGE_ID_SET';
          value: string;
      };

export function checkAuth(search: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return fetch(getUserDataUrl(), {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => sjekkAuth(response, search))
            .then(sjekkHttpFeil)
            .then(response => response.json())
            .then((bruker: Bruker) => {
                dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: bruker });
            })
            .catch(error => {
                if (error !== 401 && error !== 403) {
                    dispatch({ type: 'CHECK_AUTH_ERROR' });
                    logError(error, 'Login failed');
                }
            });
    };
}

export function postNewKlage(klageskjema: KlageSkjema) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return postKlage(klageSkjemaToKlageDraft(klageskjema))
            .then(response => {
                setKlageId((response.id as unknown) as string, response.tema, response.ytelse, response.saksnummer);
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response, klageskjema: klageskjema });
            })
            .catch(err => {
                logError(err, 'Post new klage failed');
            });
    };
}

export function updateKlage(klageskjema: KlageSkjema) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return putKlage(klageSkjemaToKlage(klageskjema))
            .then(response => {
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: response, klageskjema: klageskjema });
            })
            .catch(err => {
                logError(err, 'Update klage failed', { klageid: klageskjema.id });
            });
    };
}

export function getExistingKlage(klageId: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return getKlage(klageId)
            .then(response => {
                setStorageContent(response.tema, response.ytelse, response.saksnummer || '');
                dispatch({ type: 'KLAGE_GET_SUCCESS', payload: response });
            })
            .catch(err => {
                logError(err, 'Get existing klage failed');
                if (err.response.status !== 401) {
                    sessionStorage.removeItem('nav.klage.klageId');
                    sessionStorage.removeItem('nav.klage.tema');
                    sessionStorage.removeItem('nav.klage.ytelse');
                    sessionStorage.removeItem('nav.klage.saksnr');
                }
                dispatch({ type: 'KLAGE_GET_ERROR' });
            });
    };
}

export function setValgtYtelse(ytelse: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return dispatch({ type: 'YTELSE_SET', value: ytelse });
    };
}

export function setValgtTema(tema: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return dispatch({ type: 'TEMA_SET', value: tema });
    };
}

export function setKlageId(
    klageId: string,
    tema: string = '*UNKNOWN*',
    ytelse: string = '*UNKNOWN*',
    saksnr: string = ''
) {
    sessionStorage.setItem('nav.klage.klageId', klageId);
    if (tema !== '*UNKNOWN*' && ytelse !== '*UNKNOWN*') {
        setStorageContent(tema, ytelse, saksnr);
    }

    return function (dispatch: Dispatch<ActionTypes>) {
        return dispatch({ type: 'KLAGE_ID_SET', value: klageId });
    };
}

export function setStorageContent(tema: string, ytelse: string, saksnr: string) {
    sessionStorage.setItem('nav.klage.tema', tema);
    sessionStorage.setItem('nav.klage.ytelse', ytelse);
    sessionStorage.setItem('nav.klage.saksnr', saksnr);
}

export function sjekkAuth(response: Response, params: string) {
    if (response.status === 401 || response.status === 403) {
        window.location.assign(getLoginserviceRedirectUrl(encodeURIComponent(decodeURI(params))));
    }
    return response;
}

export const sjekkHttpFeil = (response: Response) => {
    if (response.ok) {
        return response;
    } else {
        throw response.status;
    }
};
