import { isoDateTimeToPretty, isoDateToPretty, isoTimeToPretty, prettyDateToISO } from './date';

describe('iSO dates should be pretty formatted', () => {
  it('should pretty format valid ISO dates', () => {
    expect.assertions(1);
    const isoDate = '2020-12-31';
    const pretty = isoDateToPretty(isoDate);
    expect(pretty).toBe('31.12.2020');
  });

  it('should return null for invalid ISO dates', () => {
    expect.assertions(1);
    const invalidIsoDate = 'Not a date at all.';
    const pretty = isoDateToPretty(invalidIsoDate);
    expect(pretty).toBeNull();
  });
});

describe('iSO times should be pretty formatted', () => {
  it('should pretty format valid ISO times', () => {
    expect.assertions(1);
    const iso = '14:25:19.734593';
    const pretty = isoTimeToPretty(iso);
    expect(pretty).toBe('14:25:19');
  });

  it('should return null for invalid ISO times', () => {
    expect.assertions(1);
    const iso = 'Not a time at all.';
    const pretty = isoTimeToPretty(iso);
    expect(pretty).toBeNull();
  });
});

describe('iSO datetimes should be pretty formatted', () => {
  it('should pretty format valid ISO datetimes', () => {
    expect.assertions(1);
    const iso = '2020-10-29T14:25:19.734593';
    const pretty = isoDateTimeToPretty(iso);
    expect(pretty).toBe('29.10.2020 14:25:19');
  });

  it('should return null for invalid ISO datetimes', () => {
    expect.assertions(1);
    const iso = 'Not a date at all.';
    const pretty = isoDateTimeToPretty(iso);
    expect(pretty).toBeNull();
  });
});

describe('pretty dates should be parsed to ISO dates', () => {
  it('should ISO format valid pretty dates', () => {
    expect.assertions(1);
    const pretty = '31.12.2020';
    const isoDate = prettyDateToISO(pretty);
    expect(isoDate).toBe('2020-12-31');
  });

  it('should return null for invalid pretty dates', () => {
    expect.assertions(1);
    const pretty = 'Not a date at all.';
    const isoDate = prettyDateToISO(pretty);
    expect(isoDate).toBeNull();
  });
});
