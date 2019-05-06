require('dotenv').config()
const axios = require('axios');
const datapay = require('datapay');
const bsv = datapay.bsv;

const {BITINDEX_KEY, ADDRESS} = require('./constants');

const hdPriv = new bsv.HDPrivateKey.fromString(process.env.HDPRIV);
let balance = 0;
let keys = [];
async function run() {

    const txn = new bsv.Transaction();
    for(let i = 0; i < 25; i++) {
        const key = hdPriv.deriveChild(i).privateKey;
        keys.push(key);
        const address = key.toAddress().toString();

        const resp = await axios.get('https://api.bitindex.network/api/v2/addrs/utxos', {
            params: {
                address
            },
            headers: {
                api_key: BITINDEX_KEY
            }
        });

        for(let utxo of resp.data.data) {
            txn.from(utxo);
            balance += utxo.satoshis;
            console.log(utxo);
        }
    }

    const amount = Math.floor((balance - 25000) / 25);
    for(let key of keys) {
        txn.to(key.toAddress(), amount);
    }
    txn.change(ADDRESS)
    txn.sign(keys);
    return new Promise((resolve, reject) => {
        datapay.send({tx: txn.toString()}, (err, txid) => {
            if(err) return reject(err);
            resolve(txid);
        })
    })


    console.log(`Balance: ${balance}`);
}

run()
    .catch(console.error)
    .then(() => process.exit())