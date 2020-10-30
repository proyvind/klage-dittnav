import { getUserDataUrl } from '../clients/apiUrls';
import { Bruker } from '../types/bruker';

export async function getUser() {
    const response = await get(getUserDataUrl());

    if (response.status === 401 || response.status === 403) {
        throw new NotLoggedInError(response);
    }
    if (!response.ok) {
        throw new RequestError(response);
    }
    try {
        const user: Bruker = await response.json();
        return user;
    } catch {
        throw new JsonParseError(`Failed to parse bosy as JSON. Got:\n${response.text()}`);
    }
}

async function get(url: string) {
    try {
        return await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
    } catch (typeError) {
        throw new NetworkError(typeError);
    }
}

export class RequestError extends Error {
    public statusCode: number;

    constructor(response: Response) {
        super(`Request error. Status code ${response.status}`);
        this.statusCode = response.status;
    }
}

export class NotLoggedInError extends Error {
    public statusCode: number;

    constructor(response: Response) {
        super(`User is not logged in. Response status: ${response.status}.`);
        this.statusCode = response.status;
    }
}

export class JsonParseError extends Error {}

export class NetworkError extends Error {
    public innerError: TypeError;

    constructor(innerError: TypeError) {
        super(`Network error: ${innerError.message}`);
        this.innerError = innerError;
    }
}
