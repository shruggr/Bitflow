# Bitflow OP_RETURN transaction schemas

## REQUEST transaction
### Output - OP_RETURN
1. 1F5zgLnSvS6px1QJnZkJpALJpEoGyWm4vC
2. Workflow Txn Id
3. Schema data JSON
### Output Payment
If Stage.funds > 0, pay Stage.funds to Stage.payee

## SUBMIT transaction
### Input UTXO
If completing a task assigned to user, spend UTXO from WorkflowState.Task
For a Create task, spend from requestor's funds.
### Output - OP_RETURN
1. 183u2ms8jZ79pNhghxMhebYqheyZwLCSYt
2. Request Txn Id
3. Schema data JSON
### Output Payment
If Stage.funds > 0, pay Stage.funds to Stage.payee

## ASSIGN transaction
### Output - OP_RETURN
1. 179jCPdUp1vTndNHa57RUQNghU8CYtX8aZ
2. Workflow State Txn
3. Task Txn Id
4. Step Index
### Output Payment
If Handler.funds, pay Handler.funds to Handler.assignee

## SCRIPT transaction
### Output - OP_RETURN
1. 12XSVdqWw8rUGapcwRE7jtGCS7oeMEAtHn
2. Script text
3. Name

## WORKFLOW transaction
### Output - OP_RETURN
1. 1A5fCKDgdhdgJp8u9q9nAQSy8z69yNaFat
2. Workflow definition JSON


