/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
  testPathIgnorePatterns: ['/node_modules/', './src/middleware/verifyJWT.test.ts'],
};