module.exports = {
  preset: 'ts-jest',
  testEnvironment: './node_modules',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Optional, for extended assertions
};
