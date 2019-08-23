#!/usr/bin/env sh

## This script builds an array of folders and subfolders within ./iac/ which contain the file 'remote_state.tf'.
## It then loops through these and runs the terraform Makefile to apply that particular terraform deployment.

# terraform_component_array=(`find ../iac/ -type f -name '*remote_state.tf'`)

# for component in "${terraform_component_array[@]}"
# do :
#     COMPONENT=(`echo $component | sed -e "s/^..\/iac\/\///" -e 's/\(\/remote_state.tf\)*$//g'`);
#     cd ../iac/ && COMPONENT=$COMPONENT Make apply
# done

cd ../iac/ && COMPONENT=codebuild/build Make apply
cd ../iac/ && COMPONENT=codebuild/deploy-dev Make apply
cd ../iac/ && COMPONENT=codebuild/deploy-test Make apply
cd ../iac/ && COMPONENT=codepipeline Make apply