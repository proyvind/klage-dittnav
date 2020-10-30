export class CustomError extends Error {}

export class NetworkError extends CustomError {
    public innerError: TypeError;

    constructor(innerError: TypeError) {
        super(`Network error: ${innerError.message}`);
        this.innerError = innerError;
    }
}

export class ApiError extends CustomError {
    public response: Response;

    constructor(response: Response, message: string) {
        super(message);
        this.response = response;
    }
}

export class NotLoggedInError extends ApiError {
    constructor(response: Response) {
        super(response, `User is not logged in. Response status: ${response.status}.`);
    }
}

export class NotFoundError extends ApiError {}

export class RequestError extends ApiError {
    constructor(response: Response) {
        super(response, `Request error. Status code ${response.status}`);
    }
}

export class ParseError extends ApiError {
    public parseError: Error;

    constructor(parseError: TypeError, response: Response, errorMessage: string) {
        super(response, errorMessage);
        this.parseError = parseError;
    }
}

export class JsonParseError extends ParseError {
    constructor(parseError: TypeError, response: Response) {
        super(parseError, response, 'Failed to parse body as JSON.');
    }
}

export class TextParseError extends ParseError {
    constructor(parseError: TypeError, response: Response) {
        super(parseError, response, 'Failed to parse body as text.');
    }
}
