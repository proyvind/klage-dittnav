import {getYtelseFromSearch} from "./query-string";
import {defaultYtelse} from "../types/ytelse";

describe('search string', () => {
    it('empty search', () => {
        expect(getYtelseFromSearch()).toEqual(defaultYtelse)
    })

    it('given search', () => {
        expect(getYtelseFromSearch('?ytelse=sykepenger')).toEqual('sykepenger')
    })

    it('invalid search', () => {
        expect(getYtelseFromSearch('?wrong=wrong')).toEqual(defaultYtelse)
    })
});
