import { Dispatch } from 'react';
import { Klage, KlageSkjema, klageSkjemaToKlage, klageSkjemaToKlageDraft } from '../types/klage';
import { postKlage, putKlage, getKlage } from '../services/klageService';
import { Vedlegg, VedleggFile } from '../types/vedlegg';
import { Bruker } from '../types/bruker';
import { logError } from '../utils/logger/frontendLogger';
import { StorageKey } from '../utils/get-resume-state';
import { AxiosError } from 'axios';
import { login } from '../utils/login';
import { getUser, JsonParseError, NetworkError, NotLoggedInError, RequestError } from '../utils/get-user';
import { TemaKey } from '../types/tema';

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
          value: TemaKey;
      }
    | {
          type: 'KLAGE_ID_SET';
          value: string;
      }
    | {
          type: 'SET_FINALIZED_DATE';
          value: string | null;
      }
    | {
          type: 'SET_LOADING';
          value: boolean;
      };

export function checkAuth(required: boolean = true) {
    return async function (dispatch: Dispatch<ActionTypes>) {
        dispatch({ type: 'SET_LOADING', value: true });
        try {
            const user = await getUser();
            dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: user });
            return user;
        } catch (error) {
            if (error instanceof NotLoggedInError) {
                if (required) {
                    login();
                } else {
                    dispatch({ type: 'SET_LOADING', value: false });
                }
            } else if (
                error instanceof RequestError ||
                error instanceof NetworkError ||
                error instanceof JsonParseError
            ) {
                dispatch({ type: 'CHECK_AUTH_ERROR' });
                logError(error);
            }
            return null;
        }
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

export function setValgtTema(tema: TemaKey) {
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
