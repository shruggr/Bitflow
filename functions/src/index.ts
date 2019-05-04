import axios from 'axios';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SUBMIT, REQUEST, ADDRESS, B, ASSIGN, PRIV_KEY, DUST, SCHEMA } from './constants';
import { Workflow, WorkflowState, Schema } from './bitflow-proto';
import { NodeVM } from 'vm2';
import { Payload } from './payload';

const datapay = require('datapay');

const vm = new NodeVM();

admin.initializeApp();
const db = admin.firestore();
const rtDb = admin.database();

export const webhook = functions.https.onRequest(async (req, res) => {
    if(!req.body.txid) {
        console.error('Missing txid');
        return res.status(400).send();
    }
    console.log(req.body);

    const txnDoc = await db.collection('txns').doc(req.body.txid).get();
    if(txnDoc.exists) {
        console.log(`Duplicate txn: ${req.body.txid}`);
        return res.status(200).send();
    }

    const txnData = await getTxn(req.body.txid);
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    if(!opRet) {
        console.log('No OP_RETURN');
        return res.status(200).send();
    }

    switch(opRet.s1) {
        case REQUEST:
            await processRequest(txnData);
            break;
        case SUBMIT:
            await processSubmit(txnData);
            break;
    }
    return res.json({success: true});
});

async function getTxn(txid: string, filter: any = {}): Promise<any> {
    var query = {
        v: 3,
        q: { find: filter, limit: 1 }
      };
      const b64 = btoa(JSON.stringify(query));
      const url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
      const header = { headers: { key: "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU" } };
      let r = await axios(url, header);
      return r.data.c[0] | r.data.u[0];
}

async function getData(path: string) {
    return new Promise((resolve) => {
        rtDb.ref(path).once('value', (data) => {
            resolve(data);
        })
    })
}

async function getWorkflow(workflowTxn: string) {
    const workflow = await Workflow.fromObject(await getData(`workflows/${workflowTxn}`))
    if(!workflow) {
        throw new Error(`Invalid Workflow`);
    }
    return workflow;
}

async function getScript(scriptTxn: string) {
    const txnData = await getTxn(scriptTxn, {
        "out.s1": B
    });
    if(!txnData) {
        throw new Error(`Invalid Script: ${scriptTxn}`);
    }
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    return opRet.ls2 || opRet.s2;
}

async function getSchema(schemaTxn: string) {
    const txnData = await getTxn(schemaTxn, {
        "out.s1": SCHEMA
    });
    if(!txnData) {
        throw new Error(`Invalid Schema: ${schemaTxn}`);
    }
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    return opRet.ls2 || opRet.s2;
}

async function processRequest(txnData: any) {
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    const workflow = await getWorkflow(opRet.s2);
    const step = workflow.steps[0];

    const workflowState = WorkflowState.fromObject({
        id: txnData.tx.h,
        workflowTxn: opRet.s2,
        status: WorkflowState.Status.Open,
        tasks: []
    });

    const data = JSON.parse(opRet.ls3 || opRet.s3);

    if(step.validationScriptTxn) {
        const script = await getScript(step.validationScriptTxn);
        const validate = vm.run(script);
        if(!validate(workflowState, data)) {
            throw new Error(`Validation script error: ${step.validationScriptTxn}`);
        }
    }

    for(let handler of step.onComplete || []) {
        if(handler.processScriptTxn) {
            const script = await getScript(handler.processScriptTxn);
            const process = vm.run(script);

            if(!process(workflowState, data)) continue;
        }

        const payload: any = {
            pay: {
                key: PRIV_KEY,
                to: []
            }
        }

        let task;
        if(handler.createTaskStepIdx) {
            payload.data = [
                ASSIGN,
                workflow.id,
                handler.createTaskStepIdx
            ];

            payload.pay.to.push({
              address: handler.assignee,
              value: DUST
            });

            const nextStep = workflow.steps[handler.createTaskStepIdx];
            task = WorkflowState.Task.fromObject({
                step: nextStep,
                status: WorkflowState.Status.Open
            });

            if(nextStep.schemaTxn) {
                const schema = await getSchema(nextStep.schemaTxn);
                for(let field of schema.field) {
                    if(field.type == Schema.Type.Image || field.type == Schema.Type.File) {

                    }
                }
            }


        }

    }
    // rtDb.ref(`state/${workflowState.id}`)
}

async function processSubmit(txnData: any) {
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    const workflow = await getWorkflow(opRet.s2);
    c



}