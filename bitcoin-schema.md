# Bitflow OP_RETURN transaction schemas

## Complete Task
### Input UTXO
If completing a task assigned to user, spend UTXO from WorkflowState.Task
For a Create task, spend from requestor's funds.

### Output - OP_RETURN
1. 183u2ms8jZ79pNhghxMhebYqheyZwLCSYt
2. Workflow Txn
3. Schema data

### Output Payment
If Step.fundsRequired > 0, pay Step.fundsRequired to Step.payee


## Create Task
### OP_RETURN
1. 179jCPdUp1vTndNHa57RUQNghU8CYtX8aZ
2. Workflow Txn

### Output UTXO
If Handler.funds, pay Handler.funds to Handler.assignee


