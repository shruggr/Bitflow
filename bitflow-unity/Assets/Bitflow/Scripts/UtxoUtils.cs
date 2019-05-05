using System.Collections.Generic;
using System.Linq;
using NBitcoin;
using Newtonsoft.Json;
using UnityEngine;

public static class UtxoUtils
{
    public static Transaction BuildTxn( Coin coin, Key signer, KeyValuePair<Script, Money>[] receivers,
        bool subtractFees = false, IDestination changeDestination = null )
    {
        return BuildTxn( coin.ToList(), signer.ToArr(), receivers, subtractFees, changeDestination );
    }

    public static Transaction BuildTxn( List<Coin> coins, Key[] signers, KeyValuePair<Script, Money>[] receivers,
        bool subtractFees = false, IDestination changeDestination = null )
    {
        if ( changeDestination == null )
        {
            changeDestination = signers.First();
        }

        var feeRate = new FeeRate( Money.Satoshis( 1 ), 1 );

        var txnBuilder = NBitcoin.Altcoins.BCash.Instance.Mainnet.CreateTransactionBuilder();
        txnBuilder = txnBuilder
            .AddCoins( coins )
            .AddKeys( signers );
        txnBuilder = receivers.Aggregate( txnBuilder,
            ( currentBuilder, receiver ) => currentBuilder.Send( receiver.Key, receiver.Value ) );
        if ( subtractFees )
        {
            txnBuilder = txnBuilder.SubtractFees();
        }

        var tx = txnBuilder.SetChange( changeDestination )
            .SendEstimatedFees( feeRate )
            .BuildTransaction( true );

        if ( !txnBuilder.Verify( tx, feeRate, out var exceptions ) )
        {
            Debug.LogError( $"Invalid Tx: {JsonConvert.SerializeObject( tx )}" );
            foreach ( var e in exceptions )
            {
                Debug.LogError( $"{e.GetType()}: {e}" );
            }
        }

        Debug.Log( $"Fee for txn is {tx.GetFee( txnBuilder.FindSpentCoins( tx ) ).Satoshi} sat" );
        return tx;
    }

    public static Transaction BuildTxnFromUtxo( Key spender, UTXO utxo, byte[][] msg )
    {
        // Debug.Log($"Building utxo with: {JsonConvert.SerializeObject(utxo)}");

        return BuildTxn( utxo.ToCoin( spender ), spender,
            new[] // Outs
            {
                new KeyValuePair<Script, Money>( TxNullDataTemplate.Instance.GenerateScriptPubKey( msg ), Money.Zero )
            } );
    }
}