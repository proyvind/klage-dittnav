import { Dispatch } from 'react';
import { ReadOnlyKlage, UpdateKlage } from '../types/klage';
import { Vedlegg, VedleggFile } from '../types/vedlegg';
import { Bruker } from '../types/bruker';
import { logError } from '../utils/logger/frontendLogger';
import { StorageKey } from '../utils/get-resume-state';
import { login } from '../utils/login';
import { getUser, JsonParseError, NetworkError, NotLoggedInError, RequestError } from '../utils/get-user';

export type ActionTypes =
    | {
          type: 'CHECK_AUTH_ERROR';
      }
    | {
          type: 'CHECK_AUTH_SUCCESS';
          value: Bruker;
      }
    | {
          type: 'KLAGE_POST_SUCCESS';
          value: ReadOnlyKlage;
      }
    | {
          type: 'KLAGE_GET_SUCCESS';
          value: ReadOnlyKlage;
      }
    | {
          type: 'KLAGE_UPDATE';
          value: UpdateKlage;
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
            dispatch({ type: 'CHECK_AUTH_SUCCESS', value: user });
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
