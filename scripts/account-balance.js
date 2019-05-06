require('dotenv').config()
const axios = require('axios');
const datapay = require('datapay');
const bsv = datapay.bsv;

const {BITINDEX_KEY} = require('./constants');

const hdPriv = new bsv.HDPrivateKey.fromString(process.env.HDPRIV);
let balance = 0;
async function run() {
    for(let i = 0; i < 25; i++) {
        const key = hdPriv.deriveChild(i).privateKey;
        const address = key.toAddress().toString();
        const resp = await axios.get('https://api.bitindex.network/api/v2/addrs/balance', {
            params: {
                address
            },
            headers: {
                api_key: BITINDEX_KEY
            }
        });
        console.log(`${address}: ${JSON.stringify(resp.data, null, 2)}`);

        const data = resp.data.data[0];
        balance += parseInt(data.confirmed) + parseInt(data.unconfirmed);

    }

    console.log(`Balance: ${balance}`);
}

run()
    .catch(console.error)
    .then(() => process.exit())