// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['.*.mock.js', './test'],
  testPathIgnorePatterns: ['/node_modules/', '/templates/'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testEnvironment: 'node',
};
