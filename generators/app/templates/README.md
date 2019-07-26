# Serverless Scaffolder
Welcome to your new scaffolded Lambda serverless project.

## What is generated?
- src folder with index.js and Lambda entry point function.
- Linter with opinionated linting rules.
- .gitignore file which includes files you will typically want to keep out of your git repository.
- .nvmrc which locks the Lambda to Node version 12.3.0. This can be changed if needed. To use the version included here install nvm and run `nvm use`.
- Pre-commit rules which (among other things) ensures AWS keys are not accidentally posted to a git repository (pre-commit will need to be installed for this to work).
- The Jest testing suite to unit test code.
- A package.json file with all the necessarry npm installs and commands to get you started developing Lambda functions.
- This Readme.

## Subgenerators

### Service
To generate a new service in the `src/services` folder of your generated project run
```bash
yo serverless-scaffolder:service
```
This will create a new service class and Jest test file to unit test the aforementioned class.

### Util
To generate a new set of utils in the `src/utils` folder of your generated project run
```bash
yo serverless-scaffolder:util
```
This will create a new util file and Jest test file to unit test the aforementioned functions.

### Constants
To generate a new constants file in the `src/constants` folder of your generated project run
```bash
yo serverless-scaffolder:constants
```
This will create a new constants file.