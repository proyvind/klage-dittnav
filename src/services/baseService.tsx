import {logApiError, logEvent} from '../utils/logger';
import axios from 'axios';

const getOptions = {
    withCredentials: true
};

const postOptions = {
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

const vedleggPostOptions = {
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/formdata'
    }
};

export async function get(resource: string) {
    logEvent({resource});
    let response = await axios.get(resource, getOptions)
    try {
        return await response.data;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function post(resource: string, item: any) {
    logEvent({resource});
    let response = await axios.post(resource, JSON.stringify(item), postOptions);
    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function postVedlegg(resource: string, vedlegg: any) {
    logEvent({resource});
    let response = await axios.post(resource, vedlegg, vedleggPostOptions);
    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}
