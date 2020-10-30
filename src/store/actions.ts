import { Dispatch } from 'react';
import { getUserDataUrl } from '../clients/apiUrls';
import { Klage, KlageSkjema, klageSkjemaToKlage, klageSkjemaToKlageDraft } from '../types/klage';
import { postKlage, putKlage, getKlage } from '../services/klageService';
import { Vedlegg, VedleggFile } from '../types/vedlegg';
import { Bruker } from '../types/bruker';
import { logError } from '../utils/logger/frontendLogger';
import { StorageKey } from '../utils/get-resume-state';
import { AxiosError } from 'axios';
import { login } from '../utils/login';

export type ActionTypes =
    | {
          type: 'CHECK_AUTH_ERROR';
      }
    | {
          type: 'CHECK_AUTH_SUCCESS';
          payload: Bruker;
      }
    | {
          type: 'KLAGE_FORM_SET';
          klageSkjema: KlageSkjema;
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
      }
    | {
          type: 'SET_FINALIZED_DATE';
          value: string | null;
      };

export function checkAuth() {
    return function (dispatch: Dispatch<ActionTypes>) {
        return fetch(getUserDataUrl(), {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => sjekkAuth(response))
            .then(sjekkHttpFeil)
            .then(response => response.json() as Promise<Bruker>)
            .then(bruker => {
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

export function postNewKlage(klageSkjema: KlageSkjema) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return postKlage(klageSkjemaToKlageDraft(klageSkjema))
            .then(klage => {
                dispatch({ type: 'KLAGE_POST_SUCCESS', payload: klage, klageskjema: klageSkjema });
                setStorageContent(klage.id.toString(), klage.tema, klage.ytelse, klage.saksnummer);
            })
            .catch((err: AxiosError) => {
                logError(err, 'Post new klage failed');
            });
    };
}

export function updateKlage(klageSkjema: KlageSkjema) {
    return putKlage(klageSkjemaToKlage(klageSkjema)).catch((err: AxiosError) => {
        logError(err, 'Update klage failed', { klageid: klageSkjema.id });
    });
}

export function getExistingKlage(klageId: string) {
    return function (dispatch: Dispatch<ActionTypes>) {
        return getKlage(klageId)
            .then(klage => {
                dispatch({ type: 'KLAGE_GET_SUCCESS', payload: klage });
                setStorageContent(klageId, klage.tema, klage.ytelse, klage.saksnummer);
            })
            .catch((err: AxiosError) => {
                logError(err, 'Get existing klage failed');
                if (err?.response?.status !== 401) {
                    clearStorageContent();
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

export function setKlageId(klageId: string) {
    if (klageId.length === 0) {
        throw new Error('Invalid klage ID.');
    }
    return function (dispatch: Dispatch<ActionTypes>) {
        return dispatch({ type: 'KLAGE_ID_SET', value: klageId });
    };
}

export function setStorageContent(
    klageId?: string | null,
    tema?: string | null,
    ytelse?: string | null,
    saksnummer?: string | null
) {
    new Map<string, string | undefined | null>([
        [StorageKey.KLAGE_ID, klageId],
        [StorageKey.TEMA, tema],
        [StorageKey.YTELSE, ytelse],
        [StorageKey.SAKSNUMMER, saksnummer]
    ]).forEach((value, key) => {
        if (typeof value === 'string' && value.length !== 0) {
            sessionStorage.setItem(key, value);
        } else {
            sessionStorage.removeItem(key);
        }
    });
}

export function clearStorageContent() {
    sessionStorage.removeItem(StorageKey.KLAGE_ID);
    sessionStorage.removeItem(StorageKey.TEMA);
    sessionStorage.removeItem(StorageKey.YTELSE);
    sessionStorage.removeItem(StorageKey.SAKSNUMMER);
}

export function sjekkAuth(response: Response) {
    if (response.status === 401 || response.status === 403) {
        login();
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
