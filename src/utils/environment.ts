export interface InboundEnvironment {
    appUrl: string;
    loginserviceUrl: string;
    apiUrl: string;
}

export default class Environment {
    static REACT_APP_URL: string;
    static REACT_APP_API_URL: string;
    static REACT_APP_LOGINSERVICE_URL: string;

    static settEnv = (result: InboundEnvironment) => {
        Environment.REACT_APP_URL = result.appUrl;
        Environment.REACT_APP_LOGINSERVICE_URL = result.loginserviceUrl;
        Environment.REACT_APP_API_URL = result.apiUrl;
    };
}

export const fetchEnv = () =>
    fetch(`/config`, {
        method: "GET",
        credentials: "include",
    }).then((result) => result.json());
