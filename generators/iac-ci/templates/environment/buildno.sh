#!/usr/bin/env sh

aws ssm put-parameter --name "/core/codebuild/wilbur-hr-getbalance-deploy-dev/buildnumber" --type "String" --value $BUILDNUMBER --overwrite
echo "Updating /core/codebuild/wilbur-hr-getbalance-deploy-dev/buildnumber"
export BUILDVERSION=$MAJOR.$MINOR.$BUILDNUMBER
