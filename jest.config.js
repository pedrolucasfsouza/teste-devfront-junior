const { pathsToModuleNameMapper: mapper } = require('ts-jest');
const { compilerOptions: config } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: mapper(config.paths, { prefix: '<rootDir>/' }),
};
