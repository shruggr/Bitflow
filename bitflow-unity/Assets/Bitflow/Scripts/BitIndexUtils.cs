using System;
using System.Text;
using BestHTTP;
using Newtonsoft.Json;
using UnityEngine;

public static class BitIndexUtils
{
    const string BitIndexEndpoint = "https://api.bitindex.network/api/v3/";
    const string BitIndexApiKey = "5T6sMWgBGvfU6pdXmRsxnKqhWYCjAMjxS634cMF6bp9cVerCWYh7a14EuSyzmhXvvd";

    public static void QueryUtxos(string address, Action<BitIndexUTXO[]> next)
    {
        // https://api.bitindex.network/api/v3/main/addrs/utxo
        var queryEndpoint = BitIndexEndpoint + "main/addrs/utxo";

        // TODO: Implement a timeout

        var request = new HTTPRequest(new Uri(queryEndpoint), HTTPMethods.Post, true,
            (r, queryResponse) =>
            {
                if (queryResponse.IsSuccess)
                {
                    var utxos = JsonConvert.DeserializeObject<BitIndexUTXO[]>(
                        queryResponse.DataAsText);
                    //Debug.Log( $"Found {utxos.Length} utxos" );
                    next(utxos);
                }
                else
                {
                    Debug.LogError($"BitIndex query not successful. Endpoint:{queryEndpoint}, Address:{address}");
                    // TODO: when this happens ensure we try again or show an error - instead of assuming the identity has no utxos
                    next(null);
                }
            });

        var data = $"{{\"addrs\":\"{address}\"}}";
        request.RawData = Encoding.UTF8.GetBytes(data);
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("api_key", BitIndexApiKey); // API key
        request.Send();
    }



    public static void ContinuallyQueryUtxoUntilThenDo(string address, Predicate<BitIndexUTXO[]> until, Action<bool> next, int attempts = 0)
    {
        const int maxAttempts = 10;
        QueryUtxos(address, utxos =>
       {
           if (until(utxos))
           {
               next(true);
           }
           else
           {
               if (attempts < maxAttempts)
               {
                   ContinuallyQueryUtxoUntilThenDo(address, until, next, ++attempts);
               }
               else
               {
                   next(false);
               }
           }
       });
    }

    public static void QueryTxn(string txnId, Action<BitIndexTx> next)
    {
        var queryEndpoint = BitIndexEndpoint + "main/tx/" + txnId;
        var request = new HTTPRequest(new Uri(queryEndpoint), HTTPMethods.Get,
            (r, queryResponse) =>
            {
                if (queryResponse.IsSuccess)
                {
                    try
                    {
                        Debug.Log(queryResponse.DataAsText);
                        var tx = JsonConvert.DeserializeObject<BitIndexTx>(
                            queryResponse.DataAsText);
                        next(tx);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"{e.GetType()}: {e.Message}");
                    }
                }
                else
                {
                    Debug.LogError("BitIndex query not successful");
                    next(new BitIndexTx());
                }
            });

        request.AddHeader("api_key", BitIndexApiKey); // API key
        request.Send();
    }

    public static void QueryAddressDetails(string address, Action<BitIndexAddressDetails> next)
    {
        var queryEndpoint = BitIndexEndpoint + "main/addr/" + address;
        var request = new HTTPRequest(new Uri(queryEndpoint), HTTPMethods.Get,
            (r, queryResponse) =>
            {
                if (queryResponse.IsSuccess)
                {
                    try
                    {
                        var details = JsonConvert.DeserializeObject<BitIndexAddressDetails>(
                            queryResponse.DataAsText);
                        next(details);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"{e.GetType()}: {e.Message}");
                    }
                }
                else
                {
                    Debug.LogError("BitIndex query not successful");
                    next(new BitIndexAddressDetails());
                }
            });

        request.AddHeader("api_key", BitIndexApiKey); // API key
        request.Send();
    }

    public static UTXO[] ToUTXOs(this BitIndexUTXO[] bitQueryUtxos)
    {
        var utxos = new UTXO[bitQueryUtxos.Length];
        for (var i = 0; i < bitQueryUtxos.Length; i++)
        {
            utxos[i] = bitQueryUtxos[i].ToUTXO();
        }

        return utxos;
    }

    public static UTXO ToUTXO(this BitIndexUTXO bitQueryUtxo)
    {
        return new UTXO
        {
            //Address = bitQueryUtxo.Address,
            Vout = bitQueryUtxo.Vout,
            Satoshis = (int)bitQueryUtxo.Satoshis,
            Script = bitQueryUtxo.ScriptPubKey,
            Txid = bitQueryUtxo.Txid
        };
    }
}