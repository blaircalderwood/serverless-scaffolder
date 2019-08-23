##### This Makefile is intended to wrap all running of Terraform within this repository 
## Before we start test that we have the mandatory executables available
	EXECUTABLES = git terraform
	K := $(foreach exec,$(EXECUTABLES),\
		$(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH, consider apt-get install $(exec)")))


.PHONY: plan

init:
	@echo "initialize remote state file"
	cd $(COMPONENT) && \
	terraform init

validate: init
	@echo "running terraform validate"
	cd $(COMPONENT) && \
	terraform validate -no-color

plan: validate
	@echo "running terraform plan"
	cd $(COMPONENT) && \
	terraform plan -no-color

apply: plan
	@echo "running terraform apply"
	cd $(COMPONENT) && \
	terraform apply -no-color

plan-destroy: validate
	@echo "running terraform plan -destroy"
	cd $(COMPONENT) && \
	terraform plan -destroy -no-color

destroy: init
	@echo "running terraform destroy"
	cd $(COMPONENT) && \
	terraform destroy -force -no-color
