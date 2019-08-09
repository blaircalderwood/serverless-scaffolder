const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

it('generates a constants file', () => {
  const constantsName = 'a-test-constants-file';

  return helpers
    .run(path.join(__dirname, '.'))
    .withArguments([constantsName])
    .then(() => {
      assert.file(`src/constants/${constantsName}.js`);
    });
});
