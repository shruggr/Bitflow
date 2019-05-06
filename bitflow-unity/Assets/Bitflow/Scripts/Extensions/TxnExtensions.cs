using System;
using System.Text;
using System.Text.RegularExpressions;
using BestHTTP;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.SceneManagement;
using Transaction = NBitcoin.Transaction;

public static class TransactionExtensions
{
    const string TxnBroadcastEndpoint = "https://us-central1-bitflow-a5e50.cloudfunctions.net/tx";

    public static void Spend( this Transaction txn, Action<string> a )
    {
        var txnReportRequest = new HTTPRequest(
            new Uri( TxnBroadcastEndpoint ), HTTPMethods.Post,
            ( txnR, txnResponse ) =>
            {
                try
                {
                    var response = JsonConvert.DeserializeAnonymousType( txnResponse.DataAsText,
                        new { Success = false, R = "", Message = "" } );
                    if ( !response.Success )
                    {
                        Debug.LogError( "Spend response was unsuccessful - " + response.Message );
                        Debug.LogError( txnResponse.DataAsText );
                        throw new SpendUTXOException( response.Message );
                    }

                    var hashRegex = new Regex( @"^([A-Fa-f0-9]{64})$" );
                    if ( hashRegex.IsMatch( response.R ) )
                    {
                        a( response.R );
                    }
                    else
                    {
                        Debug.LogError( "Failed spending utxo, return hash wasn't an hash" );
                        Debug.LogError( txnResponse.DataAsText );
                        throw new SpendUTXOException( txnResponse.DataAsText );
                    }
                }
                catch ( Exception e )
                {
                    if ( txnResponse != null )
                    {
                        Debug.LogError( "Fatal error: " + txnResponse.DataAsText );
                    }
                    else
                    {
                        Debug.LogError( "Failed to spend transaction" );
                        Debug.LogError( txnR.Exception.Message );
                    }

                    Debug.LogError( $"{e.GetType()}: {e.Message}" );

                    ModalDialog.Instance.CallbackYes.AddListener( () => { SceneManager.LoadScene( "Main" ); } );
                    ModalDialog.Instance.Show( "Failed to spend UTXO",
                        $"{e.GetType()}: {e.Message}",
                        "Ok" );

                    //Debug.LogError(JsonConvert.SerializeObject(txn));
                    //Debug.LogError($"{{\"tx\":\"{txn.ToHex()}\"}}");
                }
            } );
        txnReportRequest.AddHeader( "Content-Type", "application/json" );
        txnReportRequest.RawData = Encoding.UTF8.GetBytes( $"{{\"tx\":\"{txn.ToHex()}\"}}" );
        txnReportRequest.Send();
    }
}

public class SpendUTXOException : Exception
{
    public SpendUTXOException( string message ) : base( message )
    {
    }
}