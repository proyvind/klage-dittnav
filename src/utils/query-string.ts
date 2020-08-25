import { Tema } from '../types/tema';

export function getYtelseFromSearch(search?: string) {
    if (!search || search.length <= 1) {
        return Tema['UKJ'];
    }

    const ytelseParams = search
        .substring(1)
        .split('&')
        .find(s => s.startsWith('ytelse='))
        ?.split('=');

    return ytelseParams ? ytelseParams[1] : Tema['UKJ'];
}
