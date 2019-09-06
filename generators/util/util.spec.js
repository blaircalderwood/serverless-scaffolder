const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  const serviceName = 'a-test-util';

  return helpers.run(path.join(__dirname, '.')).withArguments([serviceName]);
});

describe('Util subgenerator', () => {
  it('generates a util file in the src/utils/<utilName> folder with the correct util name', () => {
    assert.file('src/utils/aTestUtil/a-test-util.util.js');
  });

  it('generates a test file in the generated class folder', () => {
    assert.file('src/utils/aTestUtil/a-test-util.spec.js');
  });
});
