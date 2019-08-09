const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(async done => {
  const serviceName = 'a-test-util';

  await helpers.run(path.join(__dirname, '.')).withArguments([serviceName]);
  done();
});

describe('Util subgenerator', () => {
  it('generates an util file in the src/utils/<utilName> folder with the correct util name', () => {
    assert.file('src/utils/aTestUtil/a-test-util.util.js');
  });

  it('generates a test file in the generated class folder', () => {
    assert.file('src/utils/aTestUtil/a-test-util.spec.js');
  });
});
