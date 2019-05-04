using System;
using System.IO;
using System.Security.Authentication;
using JetBrains.Annotations;
using NBitcoin;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Assertions;
using Network = NBitcoin.Network;

[CreateAssetMenu( fileName = "Identity", menuName = "Auth/Identity" )]
public class Identity : ScriptableObject
{
    [Serializable] struct IdentitySerializationWrapper
    {
        public string Secret;
        public string Address;
    }

    public string Secret;
    public string Address;

    public const string filename = "identity.json";
    public const string PersistanceSubdirectory = @"/CryptoFights.io/Networking/Identities/";

    public bool Exists => File.Exists( path + filename );

    public bool IsLoaded => !string.IsNullOrEmpty( Secret ) && !string.IsNullOrEmpty( Address );

    string path => Application.persistentDataPath + PersistanceSubdirectory;

    public static Network Network => Network.Main;
    public bool IsValid => !string.IsNullOrEmpty( Secret ) && !string.IsNullOrEmpty( Address );
    public Key PrivateKey => new BitcoinSecret( Secret ).PrivateKey;

    public static BitcoinPubKeyAddress KeyToAddress( Key key )
    {
        return key.PubKey.GetAddress( Network );
    }

    [UsedImplicitly] public void Create()
    {
        var privKey = new Key();
        var pubKey = KeyToAddress( privKey );
        Secret = privKey.GetWif( Network ).ToString();
        Address = pubKey.ToString();

        Assert.IsTrue( !string.IsNullOrEmpty( Secret ) );
        Assert.IsTrue( !string.IsNullOrEmpty( Address ) );

        var jsonContent = JsonConvert.SerializeObject( new IdentitySerializationWrapper
        {
            Secret = Secret,
            Address = Address
        } );

        if ( !Directory.Exists( path ) )
        {
            Directory.CreateDirectory( path );
        }

        File.WriteAllText( path + filename, jsonContent );
    }

    public void Load( Action post )
    {
        var jsonContent = File.ReadAllText( path + filename );
        var identityWrapper = JsonConvert.DeserializeObject<IdentitySerializationWrapper>( jsonContent );

        Secret = identityWrapper.Secret;
        Address = identityWrapper.Address;

        if ( !IsValid )
        {
            throw new AuthenticationException();
        }

        post?.Invoke();
    }
}