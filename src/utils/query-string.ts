import { Tema } from '../types/tema';

export function getYtelseFromSearch(search?: string) {
    if (!search || search.length <= 1) {
        return '';
    }

    const temaParams = search
        .substring(1)
        .split('&')
        .find(s => s.startsWith('tema='))
        ?.split('=');

    const ytelseParams = search
        .substring(1)
        .split('&')
        .find(s => s.startsWith('ytelse='))
        ?.split('=');

    return ytelseParams ? ytelseParams[1] : temaParams ? Tema[String(temaParams[1])] : '';
}
