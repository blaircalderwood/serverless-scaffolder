// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['.*.mock.js', './test'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: <%= codeCoverage %>,
      functions: <%= codeCoverage %>,
      lines: <%= codeCoverage %>,
    },
  },
  testEnvironment: 'node',
};
