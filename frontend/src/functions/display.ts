export const displayFnr = (fnr = ''): string => {
  if (fnr.length === 11) {
    return fnr.substring(0, 6) + ' ' + fnr.substring(6);
  }

  return fnr;
};

const SIZES = ['byte', 'KB', 'MB', 'GB', 'TB'];

export const displayBytes = (bytes: number): string => {
  if (bytes === 0) {
    return '0 byte';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Math.round(bytes / Math.pow(1024, i))} ${SIZES[i] ?? 'byte'}`;
};
