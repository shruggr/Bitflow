using System.Collections;
using System.Collections.Generic;
using NBitcoin;
using UnityEngine;

public static class UtxoUtilsExtensions
{
    public static ICoin[] ToArr(this Coin coin)
    {
        return new ICoin[] { coin };
    }

    public static List<Coin> ToList(this Coin coin)
    {
        return new List<Coin> { coin };
    }

    public static Key[] ToArr( this Key key )
    {
        return new[] { key };
    }

    public static Coin ToCoin( this UTXO utxo, Script owner )
    {
        return new Coin( new uint256( utxo.TxId ), (uint)utxo.Vout, utxo.Satoshis, owner );
    }

    public static Coin ToCoin( this UTXO utxo, Key owner )
    {
        return utxo.ToCoin( owner.ScriptPubKey );
    }
}