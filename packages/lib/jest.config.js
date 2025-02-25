/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  passWithNoTests: true,
  testEnvironment: 'jsdom',
  moduleNameMapper:{
    "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy"
  },
  testPathIgnorePatterns: [
    "/build/",
    "/dist/"
  ],
  setupFilesAfterEnv: ['./src/test/setupTests.ts'],
};