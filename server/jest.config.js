/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' assert { type: "json" };

export default {
  preset: 'ts-jest',
  passWithNoTests: true,
  testEnvironment: 'node',
  roots: ["<rootDir>"],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  transformIgnorePatterns: [
    "node_modules/"
  ],
  testRegex: ".*\\.test\\.ts",
};
