"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-serverless-scaffolder")}!`)
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "Lambda name:"
      },
      {
        type: "input",
        name: "authorName",
        message: "Author name:"
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Author email:"
      },
      {
<<<<<<< HEAD
        type: "number",
        name: "codeCoverage",
        message:
          "What is the minimum acceptable % of code coverage in your project?",
        default: "80"
      }
=======
        type: 'number',
        name: 'codeCoverage',
        message:
          'What is the minimum acceptable % of code coverage in your project?',
        default: '80',
      },
>>>>>>> master
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const mappings = {
      projectName: this.props.projectName,
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail,
      authorUrl: "",
      codeCoverage: this.props.codeCoverage
    };

    this.destinationRoot(this.props.projectName);
    this.fs.copyTpl(
<<<<<<< HEAD
      this.templatePath("./**/*"),
      this.destinationPath("./"),
=======
      this.templatePath('./**/*'),
      this.destinationPath('./'),
>>>>>>> master
      mappings
    );

    this.fs.copyTpl(
<<<<<<< HEAD
      this.templatePath("./**/.*"),
      this.destinationPath("./"),
=======
      this.templatePath('./**/.*'),
      this.destinationPath('./'),
>>>>>>> master
      mappings
    );
  }

  install() {
    this.npmInstall();
  }
};
