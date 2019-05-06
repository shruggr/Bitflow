![](web/src/assets/logo.png)
# Bitflow
*Bitcoin Dynamic Workflow Engine*

## Explaination
Rather than solving a single onboarding problem, we decided to focus on building a platform which allows for many different solutions to be built.

## Onboarding Goals
Bitflow allows adminstrative users with limited technical expertise to build powerful task-based workflows, where progress is recorded to Bitcoin, without needing to understand development or Bitcoin.

Bitflow allows users to earn Bitcoin for performing tasks without needing any fiat or cryptocurrency.

Bitflow workflows can collect payments and make payouts of any amount of Bitcoin at any step of the workflow.

## Features
* All progress of a workflow is record in Bitcoin transactions.
* Mobile task management wallet built in Unity
* Web-based workflow management tool
* Custom data handling and validation using javascript scripts stored on the blockchain
* Payment collection from customers
* Payouts to users who accomplish tasks

## Artifacts
* [Management Website](https://bitflow.shruggr.cloud)
* [Android Task Wallet](bitflow.apk)
* [Schemas](bitflow-unity/Assets/Definitions/bitflow.proto)
* [Bitcoin Protocols](docs/bitcoin-schema.md)

## Technology
* Unity wallet implemented in C# with modified NBitcoin library to allow for large OP_RETURN
* Customer and Administrative wallets implemented with Money Button
* Autonmous wallets implemented with BitIndex
* Data and web services hosted on Google Firebase
* Flow-control managed by spending UTXOs from transactions with data stored in OP_RETURN
* Transactions are submitted to API for pre-broadcast validation.
* If data requirements are not met, submission is rejected and UTXO remain unspent.
* BitIndex webhooks trigger atonomous actions
* Data validation and processing scripts are implemented as javascript, stored in OP_RETURN, and run in vm2 sandbox.
* Data schemas defined in Protobuf format for cross-platform support

## Details
Everything starts by defining a Workflow. A Workflow is comprised of a series of Stages where a Task is assigned to a user to collect data which fits a defined Schema. The data is validated and processed by running a Script.

## Example Use-cases
### Photo Capture
The Photo Capture example is implemented

### Mystery Shopper






