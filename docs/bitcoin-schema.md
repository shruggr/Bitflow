# Bitflow OP_RETURN transaction schemas

## Requst Job
### Output - OP_RETURN
1. 1F5zgLnSvS6px1QJnZkJpALJpEoGyWm4vC
2. Workflow Txn
3. Schema data
### Output Payment
If Step.fundsRequired > 0, pay Step.fundsRequired to Step.payee

## Submit Task
### Input UTXO
If completing a task assigned to user, spend UTXO from WorkflowState.Task
For a Create task, spend from requestor's funds.
### Output - OP_RETURN
1. 183u2ms8jZ79pNhghxMhebYqheyZwLCSYt
2. Workflow State Txn
3. Schema data
### Output Payment
If Stage.funds > 0, pay Stage.funds to Stage.payee

## Assign Task
### Output - OP_RETURN
1. 179jCPdUp1vTndNHa57RUQNghU8CYtX8aZ
2. Workflow State Txn
3. Task Txn
4. Step Index
### Output Payment
If Handler.funds, pay Handler.funds to Handler.assignee

## Upload Script

## Upload Workflow


