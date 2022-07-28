export const parseJSON = <T>(json: string): T | null => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn('Failed to parse JSON', json, e);

    return null;
  }
};
