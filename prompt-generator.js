class PromptGenerator {
  constructor(generator) {
    this.generator = generator;
  }

  get projectName() {
    return {
      type: 'input',
      name: 'projectName',
      message: 'Lambda name:',
    };
  }

  get authorName() {
    return {
      type: 'input',
      name: 'authorName',
      message: 'Author name:',
      default: this.generator.user.git.name,
    };
  }

  get authorEmail() {
    return {
      type: 'input',
      name: 'authorEmail',
      message: 'Author email:',
      default: this.generator.user.git.email,
    };
  }

  get codeCoverage() {
    return {
      type: 'number',
      name: 'codeCoverage',
      message:
        'What is the minimum acceptable % of code coverage in your project?',
      default: '80',
    };
  }

  get pipelineName() {
    return {
      type: 'input',
      name: 'pipelineName',
      message: 'Pipeline name:',
      validate: this.checkLength,
    };
  }

  get gitRepo() {
    return {
      type: 'input',
      name: 'gitRepo',
      message: 'Git repository for build source (HTTPS):',
      validate: this.isValidUrl,
    };
  }

  get awsAccountNumber() {
    return {
      type: 'input',
      name: 'awsAccountNumber',
      message: 'AWS Account Number:',
      validate: this.isNumber,
    };
  }

  get awsRegion() {
    return {
      type: 'input',
      name: 'awsRegion',
      message: 'AWS Region:',
      validate: this.isValidRegion,
    };
  }

  get securityGroup() {
    return {
      type: 'input',
      name: 'awsLambdaSg',
      message: 'AWS Lambda Security Group (leave blank for none):',
    };
  }

  get subnets() {
    return {
      type: 'input',
      name: 'awsLambdaSubnets',
      message:
        'AWS Lambda Subnets (separate with commas for multiple subnets, leave blank for none):',
    };
  }

  get errorMessage() {
    return {
      type: 'input',
      name: 'errorMessage',
      message: 'Default error message:',
    };
  }

  checkLength(str) {
    return str.length < 50
      ? true
      : 'Length limit of 50 characters exceeded. Please choose a shorter name.';
  }

  isValidUrl(str) {
    const regionRegex = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    return str.match(regionRegex) ? true : 'Not a valid HTTPS URL.';
  }

  isNumber(str) {
    return isNaN(str) ? 'Not a valid number.' : true;
  }

  isValidRegion(str) {
    const regionRegex = /^[a-z][a-z]-[a-z]*-[0-9]{1}/;

    return str.match(regionRegex) ? true : 'Not a valid AWS region.';
  }
}

module.exports = PromptGenerator;
