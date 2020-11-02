import axios, { AxiosRequestConfig } from 'axios';
import { NewKlage, ReadOnlyKlage, UpdateKlage } from '../types/klage';
import { Vedlegg } from '../types/vedlegg';
import { logError } from '../utils/logger/frontendLogger';

const getOptions: AxiosRequestConfig = {
    withCredentials: true
};

const postOptions: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

const vedleggPostOptions: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
};

export async function get<T>(resource: string) {
    try {
        const response = await axios.get<T>(resource, getOptions);
        return response.data;
    } catch (error) {
        logError(error, 'Error from get call', { resource: resource });
        throw error;
    }
}

export async function post<T>(resource: string) {
    try {
        const response = await axios.post<T>(resource, null, postOptions);
        return response.data;
    } catch (error) {
        logError(error, 'Error from post call', { resource: resource });
        throw error;
    }
}

export async function postKlage(resource: string, klage: NewKlage) {
    try {
        const response = await axios.post<ReadOnlyKlage>(resource, JSON.stringify(klage), postOptions);
        return response.data;
    } catch (error) {
        logError(error, 'Error from post klage call', { resource: resource, klage: klage });
        throw error;
    }
}

export async function putKlage(resource: string, klage: UpdateKlage) {
    try {
        await axios.put<never>(resource, JSON.stringify(klage), postOptions);
    } catch (error) {
        logError(error, 'Error from put klage call', { resource: resource, klage: klage });
        throw error;
    }
}

export async function postVedlegg(resource: string, vedlegg: File) {
    try {
        const formData = new FormData();
        formData.append('vedlegg', vedlegg, vedlegg.name);
        const response = await axios.post<Vedlegg>(resource, formData, vedleggPostOptions);
        return response.data;
    } catch (error) {
        logError(error, 'Error from post vedlegg call', { resource: resource });
        throw error;
    }
}

export async function deleteVedlegg(resource: string) {
    try {
        await axios.delete<never>(resource, getOptions);
        return null;
    } catch (error) {
        logError(error, 'Error from delete vedlegg call', { resource: resource });
        throw error;
    }
}
