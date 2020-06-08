export interface InboundEnvironment {
    appUrl: string;
    loginserviceUrl: string;
    apiUrl: string;
}

export default class Environment {
    static REACT_APP_URL: string;
    static REACT_APP_API_URL: string;
    static REACT_APP_LOGINSERVICE_URL: string;

    static setEnv = (result: InboundEnvironment) => {
        Environment.REACT_APP_URL = result.appUrl;
        Environment.REACT_APP_LOGINSERVICE_URL = result.loginserviceUrl;
        Environment.REACT_APP_API_URL = result.apiUrl;
    };
}

export const fetchEnv = () =>
    fetch(`/config`, {
        method: 'GET',
        credentials: 'include'
    }).then(result => result.json());

export const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);