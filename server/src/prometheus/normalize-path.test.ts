import { normalizePath } from './normalize-path';

describe('normalizePath', () => {
  it('should normalize path', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/klage-dittnav-api/api/klager/12345/fritekst');
    const expected = '/klage-dittnav-api/api/klager/:id/fritekst';
    expect(actual).toBe(expected);
  });

  it('should normalize path with UUID ID and subpath', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/klage-dittnav-api/api/klager/123e4588-e89b-12d3-a456-426655440000/fritekst');
    const expected = '/klage-dittnav-api/api/klager/:id/fritekst';
    expect(actual).toBe(expected);
  });

  it('should normalize path with UUID ID', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/klage-dittnav-api/api/klager/123e4588-e89b-12d3-a456-426655440000');
    const expected = '/klage-dittnav-api/api/klager/:id';
    expect(actual).toBe(expected);
  });

  it('should normalize path with numeric ID, without second api prefix', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/some-other-api/klager/12345/fritekst');
    const expected = '/some-other-api/klager/:id/fritekst';
    expect(actual).toBe(expected);
  });

  it('should normalize path UUID but without second api prefix', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/some-other-api/klager/123e4588-e89b-12d3-a456-426655440000/fritekst');
    const expected = '/some-other-api/klager/:id/fritekst';
    expect(actual).toBe(expected);
  });
});
