import { logApiError, logEvent } from '../utils/logger';
import axios from 'axios';
import { Klage } from '../types/klage';

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
        Accept: 'application/json'
    }
};

export async function get(resource: string) {
    logEvent({ resource });
    let response = await axios.get(resource, getOptions);
    try {
        return await response.data;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function post(resource: string) {
    logEvent({ resource });
    let response = await axios.post(resource, null, postOptions);
    try {
        return await response;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function postKlage(resource: string, item: Klage): Promise<Klage> {
    logEvent({ resource });
    let response = await axios.post(resource, JSON.stringify(item), postOptions);
    try {
        let res = await response;
        return res.data;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function putKlage(resource: string, item: Klage): Promise<Klage> {
    logEvent({ resource });
    let response = await axios.put(resource, JSON.stringify(item), postOptions);
    try {
        let res = await response;
        return res.data;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function postVedlegg(resource: string, vedlegg: FormData) {
    logEvent({ resource });
    let response = await axios.post(resource, vedlegg, vedleggPostOptions);
    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}

export async function deleteVedlegg(resource: string) {
    logEvent({ resource });
    let response = await axios.delete(resource, getOptions);
    try {
        let res = await response;
        return res;
    } catch (error) {
        logApiError(resource, error);
        throw error;
    }
}
