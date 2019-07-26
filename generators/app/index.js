"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the best ${chalk.red(
          "generator-serverless-scaffolder"
        )} generator!`
      )
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
        type: "input",
        name: "awsRegion",
        message: "AWS Region:"
      },
      {
        type: "input",
        name: "awsAccountNumber",
        message: "AWS Account Number:"
      },
      {
        type: "input",
        name: "awsLambdaSg",
        message: "AWS Lambda Security Group:"
      },
      {
        type: "input",
        name: "awsLambdaSubnet1",
        message: "AWS Lambda Subnet 1:"
      },
      {
        type: "input",
        name: "awsLambdaSubnet2",
        message: "AWS Lambda Subnet 2:"
      }
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
      awsRegion: this.props.awsRegion,
      awsAccountNumber: this.props.awsAccountNumber,
      authorUrl: ""
    };

    this.destinationRoot(this.props.projectName);
    this.fs.copyTpl(
      this.templatePath("./**/*"),
      this.destinationPath("./"),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath("./**/.*"),
      this.destinationPath("./"),
      mappings
    );
  }

  install() {
    this.npmInstall();
  }
};
