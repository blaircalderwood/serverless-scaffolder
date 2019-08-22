# Infrastructure As Code (IAC)

This folder includes two types of folders

- Terraform Modules - Reusable modules of terraform which are called by individual terraform deployments
- Terraform deployments - A folder which declares what infrastructure exists for a particular component and environment (E.g. lambda/dev would declare all resources within the development environment lambda deployment)

## Usage

Terraform can be used to plan, apply and destroy infrastructure and has been abstracted into a Makefile, which can be used like so:

Terraform plan:

```
COMPONENT=lambda/dev Make apply
```

The above command shows you changes to be made to your infrastructure.

Terraform apply:

```
COMPONENT=lambda/dev Make apply
```

The above command makes any planned changes.

Terraform destroy:

```
COMPONENT=lambda/dev Make destroy
```

The above command destroys your infrastructure.

### Best practice

Terraform should be run from an orchestration tool such as Jenkins, CodePipeline, Circle CI etc. Your build/job specification should orchestrate the order infrastructure should be created, for example:

buildspec.yml

```
build:
    commands:
      - COMPONENT=lambda/$ENVIRONMENT Make $ACTION
      - COMPONENT=apigateway/$ENVIRONMENT Make $ACTION
```

The above example will first create the lambda component, followed by apigateway which is dependent on the deployed lambda function. You can see that environments and actions are tokenised, which would be options when running the build (e.g. Environment=dev, Action=plan).

### Local

When demoing, or creating proof of concept applications there is a script called 'provision-infrastructure.sh' which can be used to orchestrate standing up each of the components in this repositorys infrastructure. This should not be used for a production system.

This script should be run from the ./scripts/ folder, it will look through every folder and subfolder in ./iac/ and run an apply on any valid terraform deployment.
