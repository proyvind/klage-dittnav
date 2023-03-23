import { getLogger } from '@app/logger';

const log = getLogger('parse-json');

export const parseJSON = <T>(json: string): T | null => {
  try {
    return JSON.parse(json);
  } catch (error) {
    log.warn({ msg: 'Failed to parse JSON', data: json, error });

    return null;
  }
};
