using System;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Assertions;
using UnityEngine.UI;

public class TakePicture : MonoBehaviour
{
    [SerializeField] InputField InputField;
    [SerializeField] Image Image;
    [SerializeField] Texture2D DebugTexture;

    public UTXO UTXO;

    public void Take()
    {
        Assert.IsNotNull( UTXO, "You forgot to initialize the UTXO for this button" );
        if ( Application.platform == RuntimePlatform.WindowsEditor )
        {
            OnCameraShotComplete( DebugTexture, "" );
        }
        else
        {
            NativeToolkit.OnCameraShotComplete += OnCameraShotComplete;
            NativeToolkit.TakeCameraShot();
        }
    }

    void OnCameraShotComplete( Texture2D texture2D, string path )
    {
        ModalDialog.Instance.Show( "Processing Photo",
            "Please wait while your photo is encoded into a txn and broadcast" );
        try
        {
            var pix = texture2D.GetPixels32();

            // Copy the reversed image data to a new texture.
            var tex = new Texture2D( texture2D.width, texture2D.height );
            tex.SetPixels32( pix );
            tex.Apply();

            // TODO: Duplicated code with UploadImage.cs
            var width = 0;
            var height = 0;
            var maxSize = 800;
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

            BitIndexUtils.QueryUtxos( Authenticator.Instance.Identity.Address, utxos =>
            {
                var utxo = utxos.First();
                Debug.Log( JsonConvert.SerializeObject( utxo ) );

                UtxoUtils.BuildTxnFromUtxo(
                        Authenticator.Instance.Identity.PrivateKey,
                        utxo.ToUTXO(),
                        OpReturns.MakeImg( buffer ) )
                    .Spend( txn =>
                    {
                        var value = $"https://bico.media/{txn}";
                        Debug.Log( value );
                        ModalDialog.Instance.Hide();
                        ModalDialog.Instance.Show( "Image successfully uploaded",
                            $"Check it out at: {value}", "View Online", "Ok" );
                        ModalDialog.Instance.CallbackYes.RemoveAllListeners();
                        ModalDialog.Instance.CallbackYes.AddListener( () =>
                        {
                            //UniClipboard.SetText( $"https://bico.media/{txn}" );
                            Application.OpenURL( value );
                        } );

                        InputField.text = value;
                        var sprite = Sprite.Create( tex, new Rect( 0.0f, 0.0f, 200, 200 ), new Vector2( 0.5f, 0.5f ),
                            100.0f );
                        Image.sprite = sprite;
                    } );
            } );
        }
        catch ( Exception e )
        {
            ModalDialog.Instance.Hide();
            ModalDialog.Instance.Show( $"Something went wrong, try again later",
                $"{e.GetType()}: {e.Message}", "Ok" );
        }
    }
}