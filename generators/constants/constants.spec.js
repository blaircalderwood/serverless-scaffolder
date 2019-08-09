const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(async done => {
  const serviceName = 'a-test-constants-file';

  await helpers.run(path.join(__dirname, '.')).withArguments([serviceName]);
  done();
});

describe('Constants subgenerator', () => {
  it('generates an constants file in the src/constants folder with the correct constants name', () => {
    assert.file('src/constants/a-test-constants-file.js');
  });
});
