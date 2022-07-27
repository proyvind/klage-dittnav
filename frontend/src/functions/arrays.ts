export const arraysShallowMatch = <T>(a1: T[], a2: T[]): boolean => {
  if (a1.length !== a2.length) {
    return false;
  }

  if (a1 === a2) {
    return true;
  }

  return a1.every((v) => a2.includes(v));
};
