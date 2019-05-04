using JetBrains.Annotations;
using UnityEngine;
using NBitcoin;

public class NBitcoinTest : MonoBehaviour
{
    [UsedImplicitly] void Start()
    {
        Debug.Log( "Hello World! " + new Key().GetWif( NBitcoin.Network.Main ) );
    }
}