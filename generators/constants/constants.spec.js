const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  const serviceName = 'a-test-constants-file';

  return helpers.run(path.join(__dirname, '.')).withArguments([serviceName]);
});

describe('Constants subgenerator', () => {
  it('generates an constants file in the src/constants folder with the correct constants name', () => {
    assert.file('src/constants/a-test-constants-file.js');
  });
});
