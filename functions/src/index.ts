import axios from 'axios';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SUBMIT, REQUEST, ASSIGN, SCHEMA, UPLOAD, BITINDEX_KEY, SCRIPT, WORKFLOW } from './constants';
import { Workflow, State, Schema, UTXO, IState, ISchema, Stage } from './bitflow-proto';
import { NodeVM } from 'vm2';
import { Transaction } from '@google-cloud/firestore';
import { fromTx } from './3rd-party/txo';

const bsv = require('bsv');
const btoa = require('btoa');

const vm = new NodeVM();

admin.initializeApp();
const db = admin.firestore();
const rtDb = admin.database();

let keyCounter = 0;
const hdPriv = new bsv.HDPrivateKey.fromString(functions.config().bitflow.hdpriv);
const privateKeys: any[] = [];
const addresses: any[] = [];
for (let i = 0; i < 25; i++) {
    let key = hdPriv.deriveChild(i).privateKey;
    privateKeys.push(key);
    addresses.push(key.toAddress().toString());
}

export const tx = functions.https.onRequest(async (req, res) => {
    const txnData = await fromTx(req.body.tx);
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    try {
        let txid;
        switch (opRet && opRet.s1) {
            case REQUEST:
                if(State.Status.Complete == await processRequest(txnData, true)) {
                    txid = await sendTxn(req.body.tx);
                }
                break;
            case SUBMIT:
                if(State.Status.Complete == await processSubmit(txnData, true)) {
                    txid = await sendTxn(req.body.tx);
                }
                break;
            default:
                txid = await sendTxn(req.body.tx);
        }
        return res.json({success: true, r: txid})
    }
    catch(err) {
        const response: any = {
            success: false
        }
        if(err.response) {
            response.message = err.response.message;
            return res.status(err.response.status).json(response);
        }
        response.message = err.message;
        return res.status(500).json(response);
    }
});

export const webhook = functions.https.onRequest(async (req, res) => {
    try {
        if (!req.body.txid) {
            console.error('Missing txid');
            return res.status(400).send();
        }
        console.log(req.body);

        const txnDoc = await db.collection('txns').doc(req.body.txid).get();
        if (txnDoc.exists) {
            console.log(`Duplicate txn: ${req.body.txid}`);
            return res.status(200).send();
        }

        const txnData = await getTxn(req.body.txid);
        const opRet = txnData.out.find((out: any) => out.b0.op == 106);
        if (!opRet) {
            console.log('No OP_RETURN');
            return res.status(200).send();
        }

        switch (opRet.s1) {
            case REQUEST:
                await processRequest(txnData);
                break;
            case SUBMIT:
                await processSubmit(txnData);
                break;
            case SCHEMA:
                const schema = Schema.fromObject(JSON.parse(opRet.ls2 || opRet.s2));
                schema.txid = txnData.tx.h;
                rtDb.ref(`schemas/${txnData.tx.h}`).set(schema);
                break;
            case SCRIPT:
                db.collection('scripts').doc(txnData.tx.h).set({
                    txid: txnData.tx.h,
                    script: opRet.ls2 || opRet.s2
                });
                break;
            case WORKFLOW:
                const workflow = Workflow.fromObject(JSON.parse(opRet.ls2 || opRet.s2));
                workflow.txid = txnData.tx.h;
                rtDb.ref(`workflows/${txnData.tx.h}`).set(workflow);
        }
        return res.send();
    }
    catch(err) {
        return console.error(err);
    }
});

async function initialize() {
    const utxos = await Promise.all(addresses.map((address) => axios(
        `https://api.bitindex.network/api/v3/main/addr/${address}/utxo`,
        { headers: { api_key: BITINDEX_KEY } }
    )));
    Promise.all(addresses.map((address, i) => {
        return db.runTransaction(async (t: Transaction) => {
            const ref = db.collection('addresses').doc(address).collection('utxos');
            let old = await t.get(ref);
            await Promise.all(old.docs.map((doc) => {
                t.delete(ref.doc(doc.id))
            }));
            return Promise.all(utxos[i].data.map((utxo: any) => {
                t.set(ref.doc(`${utxo.txid}-${utxo.vout}`), utxo);
            }));
        });
    }));

    const [scripts, schemas, workflows] = await Promise.all([
        bitQuery({ "out.s1": SCRIPT }),
        bitQuery({ "out.s1": SCHEMA }),
        bitQuery({ "out.s1": WORKFLOW }),
    ])
    for (let data of scripts) {
        const opRet = data.out.find((out: any) => out.b0.op == 106);
        db.collection('scripts').doc(data.tx.h).set({
            txid: data.tx.h,
            script: opRet.ls2 || opRet.s2
        });
    }

    for (let data of schemas) {
        const opRet = data.out.find((out: any) => out.b0.op == 106);
        const schema = Schema.fromObject(JSON.parse(opRet.ls2 || opRet.s2));
        schema.txid = data.tx.h;
        rtDb.ref(`schemas/${data.tx.h}`).set(schema);
        // db.collection('schema').doc().set(schema);
    }

    for (let data of workflows) {
        const opRet = data.out.find((out: any) => out.b0.op == 106);
        const workflow = Workflow.fromObject(JSON.parse(opRet.ls2 || opRet.s2));
        workflow.txid = data.tx.h;
        rtDb.ref(`workflows/${data.tx.h}`).set(workflow);
    }
}

async function sendTxn(rawtx: string): Promise<string> {
    const resp = await axios(
        `https://api.bitindex.network/api/v3/main/tx/send`,
        {
            method: 'post',
            headers: { api_key: BITINDEX_KEY },
            data: { rawtx }
        }
    );

    return resp.data.txid;
}
async function getTxn(txid: string, filter: any = {}): Promise<any> {
    filter.tx = { h: txid };
    const results = await bitQuery(filter);
    return results[0];
}

async function bitQuery(filter: any = {}): Promise<any> {
    var query = {
        v: 3,
        q: { find: filter, limit: 1000 }
    };
    const b64 = btoa(JSON.stringify(query));
    const url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
    const header = { headers: { key: "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU" } };
    let r = await axios(url, header);

    return [...r.data.c, ...r.data.u];
}

async function getData(path: string) {
    return new Promise((resolve) => {
        rtDb.ref(path).once('value', (data) => {
            resolve(data);
        })
    })
}

async function getWorkflow(workflowTxn: string): Promise<any> {
    return new Promise((resolve, reject) => {
        rtDb.ref(`workflows/${workflowTxn}`).once('value', (snap) => {
            if (!snap.exists) return reject(new Error(`Invalid Workflow`));
            resolve(Workflow.fromObject(snap.val()));
        })
    });
}

async function getScript(scriptTxn: string): Promise<any> {
    let doc = await db.collection('scripts').doc(scriptTxn).get();
    if (!doc.exists) throw new Error(`Invalid Script: ${scriptTxn}`);
    return doc.data();
}

async function getSchema(schemaTxn: string): Promise<ISchema> {
    const schemaData = getData(`schemas/${schemaTxn}`);
    // let doc = await db.collection('schemas').doc(schemaTxn).get();
    // if (!doc.exists) throw new Error(`Invalid Schema: ${schemaTxn}`);
    return Schema.fromObject(schemaData);
}

async function processRequest(
    txnData: any,
    validateOnly: boolean = false
): Promise<State.Status> {
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    const workflow = await getWorkflow(opRet.s2);

    const task = State.Task.fromObject({
        stage: workflow.stages[0],
        status: State.Status.Open,
        address: txnData.in[0].e.a,
        txid: txnData.tx.h
    });

    const state = State.fromObject({
        txid: txnData.tx.h,
        workflow,
        status: State.Status.Open,
        tasks: [task]
    });

    const data = JSON.parse(opRet.ls3 || opRet.s3);

    if (task.stage && task.stage.validationScriptTxn) {
        const script = await getScript(task.stage.validationScriptTxn);

        const validate = vm.run(script.body);
        let context = {
            state: JSON.parse(state.data),
            data
        }
        task.status = validate(context);
    }

    if(validateOnly || task.status !== State.Status.Complete) {
        return task.status;
    }

    return processTask(
        state,
        task,
        data
    );
}

async function processSubmit(
    txnData: any,
    validateOnly: boolean = false
): Promise<State.Status> {
    const opRet = txnData.out.find((out: any) => out.b0.op == 106);
    const stateDoc = await db.collection('states').doc(opRet.s2).get();
    if(!stateDoc.exists) throw new Error(`Missing State: ${opRet.s2}`);
    const state = State.fromObject(stateDoc.data() || {});

    const taskDoc = await db.collection('pendingTasks').doc(txnData.in[0].e.h).get();
    if(!taskDoc.exists) throw new Error(`Missing Task: ${txnData.tx.h}`);

    const task = State.Task.fromObject(taskDoc.data() || {});
    const data = JSON.parse(opRet.ls3 || opRet.s3);

    if (task.stage && task.stage.validationScriptTxn) {
        const script = await getScript(task.stage.validationScriptTxn);

        const validate = vm.run(script.body);
        let context = {
            state: JSON.parse(state.data),
            data
        }
        task.status = validate(context);
    }

    if(validateOnly || task.status !== State.Status.Complete) {
        return task.status;
    }

    rtDb.ref(`pendingTasks/${taskDoc.id}`).remove();
    rtDb.ref(`tasks/${task.address}/${task.txid}`).set(task);
    return processTask(
        state,
        task,
        data
    );
}

async function processTask(
    state: IState,
    task: State.ITask,
    data: any
): Promise<State.Status> {
    let handler = (task.stage && task.stage.onComplete) || Stage.Handler.create();
    const key = privateKeys[keyCounter++ % 25];
    const address = key.toAddress().toString();

    if (handler.processScriptTxn) {
        const { script } = await getScript(handler.processScriptTxn);
        const process = vm.run(script);
        let context = {
            state: JSON.parse(state.data || '{}'),
            data
        }

        state.status = process(context);
        state.data = JSON.stringify(context.state);
    }

    let nextStage: any;
    let schema: ISchema;
    if (handler.createTaskStageIdx && state.workflow && state.workflow.stages) {
        nextStage = state.workflow.stages[handler.createTaskStageIdx];
        schema = await getSchema(nextStage.schemaTxn);
    }

    await db.runTransaction(async (t: Transaction) => {
        let utxoDocs = await t.get(db.collection('addresses').doc(address)
            .collection('utxos'));
        if (!utxoDocs.docs.length) {
            throw new Error(`${address} wallet empty`);
        }

        const txn = new bsv.Transaction()
            .from(utxoDocs.docs.map((doc) => doc.data()))

        if (handler.funds) {
            txn.to(handler.assignee, handler.funds);
        }

        let newTask;
        if (nextStage) {
            txn.addData = [
                ASSIGN,
                state.txid,
                task.txid,
                handler.createTaskStageIdx
            ];

            newTask = State.Task.fromObject({
                stage: nextStage,
                status: State.Status.Open,
                address: handler.assignee
            });

            if (schema) {
                (schema.fields || [])
                    .filter((field) => field.type == Schema.Type.Image || field.type == Schema.Type.File)
                    .forEach(() => txn.to(handler.assignee, UPLOAD));
            }
        }

        if (newTask) {
            newTask.utxos = [];
            for (let i = 0; i < txn.outputs.length; i++) {
                let out = txn.outputs[i];
                newTask.utxos.push(UTXO.fromObject(
                    Object.assign(out.toObject(), {
                        txid: txn.hash,
                        vout: i
                    })
                ));
            }
        }
        txn.change(address);
        txn.sign(key);

        await sendTxn(txn.toString());
        for (let doc of utxoDocs.docs) {
            t.delete(db.collection('addresses').doc(address)
                .collection('utxos').doc(doc.id));
        }
        const changeIdx = txn.outputs.length - 1;
        const utxo = Object.assign(txn.outputs[changeIdx].toObject(), {
            txid: txn.hash,
            vout: changeIdx
        });
        t.set(
            db.collection('addresses').doc(address)
                .collection('utxos').doc(txn.hash),
            utxo
        );

        if(newTask) {
            rtDb.ref(`tasks/${newTask.address}/${txn.hash}`).set(newTask);
            t.set(
                db.collection('pendingTasks').doc(txn.hash),
                newTask
            );
        }
        if(!state.txid) throw new Error('Missing txid');
        t.set(db.collection('states').doc(state.txid), state);
        return txn;
    });

    rtDb.ref(`state/${state.txid}`).set(state);
    return task.status || State.Status.Error;
}

initialize();