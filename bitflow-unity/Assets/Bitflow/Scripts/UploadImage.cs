﻿using System.Linq;
using Newtonsoft.Json;
using UnityEngine;

public class UploadImage : MonoBehaviour
{
    [SerializeField] Identity Identity;
    [SerializeField] Texture2D Texture2D;

    void Start()
    {
        var pix = Texture2D.GetPixels32();

        var tex = new Texture2D( Texture2D.width, Texture2D.height );
        tex.SetPixels32( pix );
        tex.Apply();

        // TODO: Refactor this after getting some sleep
        var width = 0;
        var height = 0;
        const int maxSize = 1024;
        if ( tex.width > tex.height )
        {
            if ( tex.width > maxSize )
            {
                width = maxSize;
                height = ( tex.height * maxSize ) / tex.width;
            }
        }
        else
        {
            if ( tex.height > maxSize )
            {
                height = maxSize;
                width = ( tex.width * maxSize ) / tex.height;
            }
        }

        TextureScale.Point( tex, width, height );

        Debug.Log( $"Texture is {tex.width}x{tex.height}" );

        var buffer = tex.EncodeToJPG();
        Debug.Log( buffer.Length );

        BitIndexUtils.QueryUtxos( Identity.Address, utxos =>
        {
            var utxo = utxos.First();
            Debug.Log( JsonConvert.SerializeObject( utxo ) );

            UtxoUtils.BuildTxnFromUtxo(
                    Identity.PrivateKey,
                    utxo.ToUTXO(),
                    OpReturns.MakeImg( buffer ) )
                .Spend( txn => { Debug.Log( $"https://bico.media/{txn}" ); } );
        } );
    }
}