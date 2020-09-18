import { getYtelseFromSearch } from './query-string';
import { Tema } from '../types/tema';

describe('search string', () => {
    it('empty search', () => {
        expect(getYtelseFromSearch()).toEqual('');
    });

    it('given search', () => {
        expect(getYtelseFromSearch('?ytelse=sykepenger')).toEqual('sykepenger');
    });

    it('given tema but not ytelse', () => {
        expect(getYtelseFromSearch('?tema=FOR')).toEqual(Tema['FOR']);
    });

    it('given tema and ytelse', () => {
        expect(getYtelseFromSearch('?tema=FOR&ytelse=svangerskapspenger')).toEqual('svangerskapspenger');
    });
});
