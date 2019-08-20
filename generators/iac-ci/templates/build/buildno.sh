#!/usr/bin/env sh

BUILDNUMBER=$((BUILDNUMBER + 1))
export BUILDNUMBER=$BUILDNUMBER
aws ssm put-parameter --name "/core/codebuild/<%= pipelineName %>/buildnumber" --type "String" --value $BUILDNUMBER --overwrite
export BUILDVERSION=$MAJOR.$MINOR.$BUILDNUMBER
