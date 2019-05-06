require('dotenv').config();
let axios = require('axios');
let bsv = require('bsv');
let {REQUEST, ADDRESS, BITINDEX_KEY} = require('./constants');

let priv = bsv.PrivateKey.fromWIF(process.env.WIF);
let address = priv.toAddress().toString();
console.log(address);
axios(
    `https://api.bitindex.network/api/v3/main/addr/${address}/utxo`,
    { headers: { api_key: BITINDEX_KEY } }
)
.catch((err) => console.log(err.message))
.then(async (resp) => {

    const utxos = resp.data;

    let txn = new bsv.Transaction()
        .from(utxos)
        .addData([
            Buffer.from(REQUEST),
            Buffer.from('e6fad50f43bb873dcd149bbc73cb8e7b538920a4f046002eab981e0e08041efe'),
            Buffer.from(JSON.stringify({
                description: "Springtime Tulips"
            }))
        ])
        .to(ADDRESS, 546)
        .change(bsv.Address.fromString('15oyqn5TAE7KE2qfwd1xAPhE2VfEwweLo7'))
        .sign(priv)

    return sendTxn(txn.toString())
})
.catch(console.error)
.then(() => process.exit);

async function sendTxn(tx) {
    console.log(tx);
    // return axios(
    //     `https://api.bitindex.network/api/v3/main/tx/send`,
    //     {
    //         method: 'post',
    //         headers: { api_key: BITINDEX_KEY },
    //         data: { rawtx: tx }
    //     }
    // )
    const resp = await axios(
        `https://us-central1-bitflow-a5e50.cloudfunctions.net/tx`,
        {
            method: 'post',
            data: { tx }
        }
    )
    .then((resp) => resp.data.txid)
    .catch((err) => console.log(err.message));
}