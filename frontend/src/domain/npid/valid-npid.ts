const elevenDigitsRegex = /^\d{11}$/;

const CONTROL_CIPHERS_1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const CONTROL_CIPHERS_2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

export const validNpid = (npid: string, isProd = true): boolean => {
  if (isProd) {
    if (!elevenDigitsRegex.test(npid)) {
      return false;
    }

    const day = parseInt(npid.substring(0, 2), 10);

    if (day < 1 || day > 31) {
      return false;
    }

    const month = parseInt(npid.substring(2, 4), 10); // Month + 20

    if (month < 21 || month > 32) {
      return false;
    }

    const year = parseInt(npid.substring(4, 6), 10);

    if (year < 0 || year > 99) {
      return false;
    }
  }

  const numberArray = npid.split('').map((s) => parseInt(s, 10));

  const controlCipher1 = getControlCipher(CONTROL_CIPHERS_1, numberArray.slice(0, 9));

  if (controlCipher1 !== numberArray[9]) {
    return false;
  }

  const controlCipher2 = getControlCipher(CONTROL_CIPHERS_2, numberArray.slice(0, 10));

  if (controlCipher2 !== numberArray[10]) {
    return false;
  }

  return true;
};

const getControlCipher = (controlCiphers: number[], npidCiphers: number[]) => {
  if (controlCiphers.length !== npidCiphers.length) {
    throw new Error('controlCiphers and npidCiphers must be of equal length');
  }

  const productSum = controlCiphers.reduce((sum, controlCipher, i) => sum + controlCipher * (npidCiphers[i] ?? 0), 0);

  return 11 - (productSum % 11);
};
