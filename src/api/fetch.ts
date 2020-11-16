import { JsonParseError, NetworkError, NotFoundError, NotLoggedInError, RequestError, TextParseError } from './errors';

const jsonRequestHeaders = new Headers([
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json']
]);

const jsonResponseHeaders = new Headers([['Accept', 'application/json']]);
const formDataHeaders = new Headers([['Accept', 'application/json']]);

export const getText = async (url: string, notFoundMessage: string) =>
    text(await get(url, notFoundMessage, jsonResponseHeaders));

export const getJSON = async <T>(url: string, notFoundMessage: string) =>
    json<T>(await get(url, notFoundMessage, jsonResponseHeaders));

export const postJSON = async <T, U = T>(url: string, notFoundMessage: string, body: T | null = null) =>
    json<U>(
        await post(
            url,
            notFoundMessage,
            body ? jsonRequestHeaders : jsonResponseHeaders,
            body ? JSON.stringify(body) : undefined
        )
    );

export const postFormData = async <T>(url: string, notFoundMessage: string, formData: FormData) =>
    json<T>(await post(url, notFoundMessage, formDataHeaders, formData));

export const putJSON = async <T, U = T>(
    url: string,
    notFoundMessage: string,
    body: T | null = null,
    parseResponse: boolean = true
) => {
    const response = await put(
        url,
        notFoundMessage,
        body ? jsonRequestHeaders : jsonResponseHeaders,
        body ? JSON.stringify(body) : undefined
    );
    return parseResponse ? json<U>(response) : response;
};

async function text(response: Response) {
    try {
        return await response.text();
    } catch (parseError) {
        throw new TextParseError(parseError, response);
    }
}

async function json<T>(response: Response) {
    try {
        return (await response.json()) as Promise<T>;
    } catch (parseError) {
        throw new JsonParseError(parseError, response);
    }
}

export const get = (url: string, notFoundMessage: string, headers?: Headers) =>
    executeFetch(
        url,
        {
            method: 'GET',
            credentials: 'include',
            headers
        },
        notFoundMessage
    );

export const post = async (url: string, notFoundMessage: string, headers?: Headers, body?: string | FormData) =>
    executeFetch(
        url,
        {
            method: 'POST',
            credentials: 'include',
            body,
            headers
        },
        notFoundMessage
    );

export const put = async (url: string, notFoundMessage: string, headers?: Headers, body?: string) =>
    executeFetch(
        url,
        {
            method: 'PUT',
            credentials: 'include',
            body,
            headers
        },
        notFoundMessage
    );

export const del = async (url: string, notFoundMessage: string) =>
    executeFetch(
        url,
        {
            method: 'DELETE',
            credentials: 'include'
        },
        notFoundMessage
    );

const executeFetch = (url: string, options: RequestInit, notFoundMessage: string) =>
    fetch(url, options)
        .catch((typeError: TypeError) => {
            throw new NetworkError(typeError);
        })
        .then(response => {
            if (response.status === 404) {
                throw new NotFoundError(response, notFoundMessage);
            }
            if (response.status === 401 || response.status === 403) {
                throw new NotLoggedInError(response);
            }
            if (!response.ok) {
                throw new RequestError(response);
            }
            return response;
        });
