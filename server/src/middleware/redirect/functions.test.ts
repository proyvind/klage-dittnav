import { removeSaksnummer } from '@app/middleware/redirect/functions';

describe('redirect', () => {
  it('should remove the whole query when saksnummer is only param', () => {
    expect.assertions(1);
    expect(removeSaksnummer('/nb/klage?saksnummer=123')).toBe('/nb/klage');
  });

  it('should remove only saksnummer when it is first of multiple', () => {
    expect.assertions(1);
    expect(removeSaksnummer('/nb/klage?saksnummer=123&other=abc&test=1a2b')).toBe('/nb/klage?other=abc&test=1a2b');
  });

  it('should remove only saksnummer when it is not first of multiple query params', () => {
    expect.assertions(1);
    expect(removeSaksnummer('/nb/klage?other=abc&saksnummer=123&test=1a2b')).toBe('/nb/klage?other=abc&test=1a2b');
  });

  it('should not affect URLs without query params', () => {
    expect.assertions(1);
    expect(removeSaksnummer('/nb/klage')).toBe('/nb/klage');
  });

  it('should not affect query params without saksnummer', () => {
    expect.assertions(1);
    expect(removeSaksnummer('/nb/klage?test=123&qwe=asd')).toBe('/nb/klage?test=123&qwe=asd');
  });
});
