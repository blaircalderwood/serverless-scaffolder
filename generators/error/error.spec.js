const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  const errorName = 'a-test-error';

  return helpers.run(path.join(__dirname, '.')).withArguments([errorName]);
});

describe('Error subgenerator', () => {
  it('generates an Error class file in the src/errors with the correct class name', () => {
    assert.fileContent('src/errors/a-test-error.error.js', /ATestError/);
  });
});
