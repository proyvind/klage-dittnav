import { logApiError, logEvent } from '../utils/logger';

const getOptions = {
    method: 'GET'
};

const postOptions = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: ''
};

const vedleggPostOptions = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/formdata'
    },
    body: ''
};

export async function get(resource: string) {
    logEvent({ resource });
    let response = await fetch(resource, getOptions);
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function post(resource: string, item: any) {
    logEvent({ resource });
    postOptions.body = JSON.stringify(item);

    let response = await fetch(resource, postOptions);
    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function postVedlegg(resource: string, vedlegg: any) {
    logEvent({ resource });
    vedleggPostOptions.body = vedlegg;

    let response = await fetch(resource, vedleggPostOptions);

    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}
