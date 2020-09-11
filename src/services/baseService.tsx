import axios from 'axios';
import { Klage } from '../types/klage';
import { logError, logInfo } from '../utils/logger/frontendLogger';

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

export async function get<T>(resource: string): Promise<T> {
    let response = await axios.get(resource, getOptions);
    try {
        return response.data;
    } catch (error) {
        logError(error, 'Error from get call', { resource: resource });
        throw error;
    }
}

export async function post<T>(resource: string): Promise<T> {
    let response = await axios.post(resource, null, postOptions);
    try {
        return response.data;
    } catch (error) {
        logError(error, 'Error from post call', { resource: resource });
        throw error;
    }
}

export async function postKlage(resource: string, item: Klage): Promise<Klage> {
    // TODO: Needed to test frontend logger, remove when verified
    logInfo('Posting new klage', { klage: item });
    let response = await axios.post(resource, JSON.stringify(item), postOptions);
    try {
        return response.data;
    } catch (error) {
        logError(error, 'Error from post klage call', { resource: resource, klage: item });
        throw error;
    }
}

export async function putKlage(resource: string, item: Klage): Promise<Klage> {
    let response = await axios.put(resource, JSON.stringify(item), postOptions);
    try {
        return response.data;
    } catch (error) {
        logError(error, 'Error from put klage call', { resource: resource, klage: item });
        throw error;
    }
}

export async function postVedlegg(resource: string, vedlegg: FormData) {
    let response = await axios.post(resource, vedlegg, vedleggPostOptions);
    try {
        return response.data;
    } catch (error) {
        logError(error, 'Error from post vedlegg call', { resource: resource });
        throw error;
    }
}

export async function deleteVedlegg(resource: string) {
    let response = await axios.delete(resource, getOptions);
    try {
        return response;
    } catch (error) {
        logError(error, 'Error from delete vedlegg call', { resource: resource });
        throw error;
    }
}
