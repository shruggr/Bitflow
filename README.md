![](web/src/assets/logo.png)
# Bitflow
*Bitcoin Dynamic Workflow Engine*

## Explanation
Rather than solving a single onboarding problem, we decided to focus on building a platform which allows for many different solutions to be built.

## Onboarding Goals
Bitflow allows developers (and with UI refinements, administrative users with limited technical expertise) to build powerful task-based workflows, where progress and payments are recorded to Bitcoin, without needing to understand Bitcoin.

Bitflow allows users to earn Bitcoin for performing tasks without needing any fiat or cryptocurrency.

Bitflow workflows can collect payments and make payouts of any amount of Bitcoin at any step of the workflow.

## Features
* All progress of a workflow is recorded in Bitcoin transactions.
* Mobile task management wallet built in Unity
* Web-based workflow management tool
* Custom data handling and validation using javascript code stored on Bitcoin
* Payment collection from customers
* Payouts to users who accomplish tasks

## Artifacts
* [Management Website](https://bitflow.shruggr.cloud)
* [Android Task Wallet](bitflow.apk)
* [Protobuf Schemas](bitflow-unity/Assets/Definitions/bitflow.proto)
* [Bitcoin Protocols](docs/bitcoin-schema.md)
* [Examples](samples)

## Technology
* Unity wallet implemented in C# with modified NBitcoin library to allow for large OP_RETURN
* Customer and Administrative wallets implemented with Money Button
* Autonomous wallets implemented with BitIndex
* Data and web services hosted on Google Firebase
* Flow-control managed by spending UTXOs from transactions with data stored in OP_RETURN
* Transactions are submitted to API for pre-broadcast validation.
* If data requirements are not met, submission is rejected and UTXO remains unspent.
* BitIndex webhooks trigger autonomous actions
* Data validation and processing scripts are implemented as javascript, stored on chain, and run in vm2 sandbox.
* Data schemas defined in Protobuf format for cross-platform support
* Leverage BSV large data carrier payloads using B-protocol
* Mobile wallet captures photos directly from the device camera


## Details
Everything starts by defining a Workflow. A Workflow is comprised of a series of Stages where a Task is assigned to a user to collect data which fits a defined Schema. The data is validated and processed by running a Script which updates the State of running workflow instance.

### Workflow
A Workflow is created by submitting a WORKFLOW transaction containing its JSON definition. In it's current implementation, users need to build Workflow definition JSON manually and upload through the Workflow Management page, but a full implementation would include a UI for building definitions.

See [Protobuf Schemas](bitflow-unity/Assets/Definitions/bitflow.proto) and [Bitcoin Protocols](docs/bitcoin-schema.md) for details.

### Stage
A Workflow is comprised of a series of Stages. Each Stage of a Workflow defines the Schema of the data to be submitted; the Script which is responsible for validating the data; and a Handler which instructs how to handle submission. Additionally a Stage can require Bitcoin to be paid with data submission.

The current implimentation is limited to series processing, where completing one Stage will initialize the next, but this can be improved to allow logical forks and parallel processing.

### Handler
A Handler defines how the Workflow should react to events in a Stage (only Completion event is implemented). This includes defining what Script will process the event data, the next Stage of the workflow, who to assign the next Stage, and what funds to pay the assignee.

For simplicity, the assignee is implemented as a hard-coded Bitcoin address, but it is envisioned that the assignee could be unassigned and "claimable", or a multi-sig "group".

### Scripts
A Script is javascript function whose source code is stored in a SCRIPT transaction. The function receives a Context object as input and returns a status code as output. The Context object includes the cumulative workflow State which can be updated within the function.

### State
A Workflow is a definition of a process, A State is an instance of the Workflow. State is not written to Bitcoin, but is a stored representation of of the cumulative progress of a series of Bitcoin transactions.

A State is created by submitting a REQUEST transaction which provides a pointer to a Workflow and the data required by the Schema of the first Stage of that Workflow.


## Example Use-cases
There are endless possibilities for workflows: a production line, a supply chain, mystery shoppers, a list of household chores or even an Easter egg hunt.

We've chosen to focus on use cases of Photo Capture to showcase Bitflow.

The roles for these simplified use cases are available in the provided [Android APK](bitflow.apk).
[Example](samples) scripts and workflow definitions are provided and are running on mainnet Bitcoin SV.


### Photo Capture
An online retailer needs curated photographs of their products. Influencers are sent products and receive BSV in exchange for taking pictures with the products. These pictures need to be reviewed and later made available on the company's online catalog.

#### Workflow

There are 3 distint role for this Workflow:
* Customer - Request the capture of a specific photo.
* Photographer - Capture and submit photo
* Reviewer - Approve that photo is of sufficient quality

The Admin creates a workflow that requests:
 * The name and serial number of the product
 * A photograph of the product
 * Lighting conditions and other notes for postprocessing

Customer request a new Photo<br>
<img src="/docs/images/create-task.png" width="500" />

The Photographer uses Bitflow's task management mobile app where a wallet address is generated, and he/she takes a photograph of the product. That transaction is submitted so a Reviewer can review the photo and details at a later time. It is not necessary for the Photographer to have funds on his address for the workflow to work.

<img src="/docs/images/screenshot0.png" height="500" width="500" />
<img src="/docs/images/screenshot1.png" height="500" width="500" />

When the Reviewer validates the photo, signs and broadcasts his transaction - potentially unbeknown to him since he may be a bitcoin layman - the Photographer receives the payout.

<img src="/docs/images/screenshot2.png" height="500" width="500" />
<img src="/docs/images/screenshot3.png" height="500" width="500" />

The workflow admin specifies the Photographer's payout when he first creates the workflow - this can be an administrative working on this online retailer company. The workflow admin is using blockchain technology without getting nitty gritty with its technical aspects or even any specific technical knowledge.

The Photographer is happy to receive his dividends in BSV.

### Mystery Shopper






