# SAP BTP Deployment Guide

## Prerequisites
1. SAP BTP Trial or Enterprise Account.
2. Cloud Foundry Environment enabled.
3. Cloud MTA Build Tool (`mbt`) installed globally.
4. CF CLI installed and logged in (`cf login`).

## Build Instructions
Navigate to the root directory and execute:
```bash
mbt build -p=cf
```
This will compile the `mta.yaml` and source code into an `mta_archives/sap-cognitive-workflow-orchestra_2.0.0.mtar` file.

## Deployment Instructions
Deploy the generated archive to your CF space:
```bash
cf deploy mta_archives/sap-cognitive-workflow-orchestra_2.0.0.mtar
```

## Post-Deployment
1. Assign the `WorkflowAdminRole` and `ApprovalUserRole` to your BTP user in the SAP BTP Cockpit (under Security -> Users).
2. Retrieve the approuter URL via `cf apps`.
3. Open the URL to access the SAP Cognitive Workflow Orchestra platform.
