using NBitcoin;
using UnityEngine;

public class GenerateWallet : MonoBehaviour
{
    void Start()
    {
        var privateKey = new Key(); // generate a random private key
        var publicKey = privateKey.PubKey;
        Debug.Log(publicKey); // 0251036303164f6c458e9f7abecb4e55e5ce9ec2b2f1d06d633c9653a07976560c
    }
}
