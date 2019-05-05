const axios = require('axios');
const admin = require('firebase-admin');
const bsv = require('bsv');
const btoa = require('btoa');

const { Workflow, Schema } = require('../web/src/lib/bitflow-proto');

const {BITINDEX_KEY, SCRIPT, SCHEMA, WORKFLOW} = require('./constants');
admin.initializeApp({
    credential: admin.credential.cert('/Users/davidcase/.ssh/bitflow-a5e50-firebase-adminsdk-dvwmk-04c1d5edad.json'),
    databaseURL: "https://bitflow-a5e50.firebaseio.com"
});
var db = admin.firestore();
const rtDb = admin.database();

const hdPriv = new bsv.HDPrivateKey.fromString('xprv9s21ZrQH143K4GvUA4ntwsBRswNRyXUgbdf1FK2dzEvzz5ctU1rgTbUsvcN5hcXoxDamQNW5APvtuedfZjwfhSnunzygeDpHohZPdPbvN8U');
const privateKeys = [];
const addresses = [];
for (let i = 0; i < 25; i++) {
    let key = hdPriv.deriveChild(i).privateKey;
    privateKeys.push(key);
    addresses.push(key.toAddress().toString());
}

Promise.resolve().then(async () => {
    const utxos = await Promise.all(addresses.map((address) => axios(
        `https://api.bitindex.network/api/v3/main/addr/${address}/utxo`,
        { headers: { api_key: BITINDEX_KEY } }
    )));
    Promise.all(addresses.map((address, i) => {
        return db.runTransaction(async (t) => {
            const ref = db.collection('addresses').doc(address).collection('utxos');
            let old = await t.get(ref);
            await Promise.all(old.docs.map((doc) => {
                t.delete(ref.doc(doc.id))
            }));
            return Promise.all(utxos[i].data.map((utxo) => {
                t.set(ref.doc(`${utxo.txid}-${utxo.vout}`), utxo);
            }));
        });
    }));

    const [scripts, schemas, workflows] = await Promise.all([
        bitQuery({ "out.s1": SCRIPT }),
        bitQuery({ "out.s1": WORKFLOW }),
    ])
    for (let data of scripts) {
        const opRet = data.out.find((out) => out.b0.op == 106);
        await db.collection('scripts').doc(data.tx.h).set({
            txid: data.tx.h,
            script: opRet.ls2 || opRet.s2,
            name: opRet.ls3 || opRet.s3
        });
    }

    for (let data of workflows) {
        try {
            const opRet = data.out.find((out) => out.b0.op == 106);
            const workflow = Workflow.fromObject(JSON.parse(opRet.ls2 || opRet.s2));
            workflow.txid = data.tx.h;
            workflow.owner = data.in[0].e.a,
            await rtDb.ref(`workflows/${data.tx.h}`).set(workflow);
        }
        catch (e) {
            console.error(e);
        }
    }
})
.catch(console.error)
.then(() => process.exit());

async function bitQuery(filter = {}) {
    var query = {
        v: 3,
        q: { find: filter, limit: 100 }
    };
    const b64 = btoa(JSON.stringify(query));
    const url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
    const header = { headers: { key: "1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN" } };
    let r = await axios(url, header);
    return (r.data.c || []).concat(r.data.u || []);
}