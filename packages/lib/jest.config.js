/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  passWithNoTests: true,
  testEnvironment: 'jsdom',
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    '\\.svg$': '../../__mocks__/svgrMock.js'
  },
  testPathIgnorePatterns: [
    "/build/",
    "/dist/"
  ],
  setupFilesAfterEnv: ['./src/test/setupTests.ts'],
};