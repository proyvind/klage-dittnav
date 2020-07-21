import { defaultYtelse } from '../types/ytelse';

export function getYtelseFromSearch(search?: string) {
    if (!search || search.length <= 1) {
        return defaultYtelse;
    }

    const ytelseParams = search
        .substring(1)
        .split('&')
        .find(s => s.startsWith('ytelse='))
        ?.split('=');

    return ytelseParams ? ytelseParams[1] : defaultYtelse;
}
