/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  passWithNoTests: true,
  transformIgnorePatterns: [
    "node_modules/"
  ],
  testRegex: ".*\\.test\\.ts",
};
