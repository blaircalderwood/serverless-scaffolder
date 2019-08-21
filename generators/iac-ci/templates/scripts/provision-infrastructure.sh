#!/usr/bin/env sh

terraform_component_array=(`find ../iac/ -type f -name '*remote_state.tf'`)

for component in "${terraform_component_array[@]}"
do :
    COMPONENT=(`echo $component | sed -e "s/^..\/iac\/\///" -e 's/\(\/remote_state.tf\)*$//g'`);
    cd ../iac/ && COMPONENT=$COMPONENT Make $1
done