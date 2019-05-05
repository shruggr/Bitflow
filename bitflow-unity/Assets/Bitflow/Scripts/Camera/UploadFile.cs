using System;
using System.Collections;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using SimpleFileBrowser;
using UnityEngine;
using UnityEngine.UI;

public class UploadFile : MonoBehaviour
{

    [SerializeField] Text FileUrl;


    public void Upload()
    {
        // Set excluded file extensions (optional) (by default, .lnk and .tmp extensions are excluded)
        // Note that when you use this function, .lnk and .tmp extensions will no longer be
        // excluded unless you explicitly add them as parameters to the function
        FileBrowser.SetExcludedExtensions( ".lnk", ".tmp", ".zip", ".rar", ".exe" );

        // Add a new quick link to the browser (optional) (returns true if quick link is added successfully)
        // It is sufficient to add a quick link just once
        // Name: Users
        // Path: C:\Users
        // Icon: default (folder icon)
        FileBrowser.AddQuickLink( "Users", "C:\\Users", null );

        // Coroutine example
        StartCoroutine( ShowLoadDialogCoroutine() );
    }

    IEnumerator ShowLoadDialogCoroutine()
    {
        // Show a load file dialog and wait for a response from user
        // Load file/folder: file, Initial path: default (Documents), Title: "Load File", submit button text: "Load"
        yield return FileBrowser.WaitForLoadDialog( false, null, "Load File", "Load" );

        // Dialog is closed
        // Print whether a file is chosen (FileBrowser.Success)
        // and the path to the selected file (FileBrowser.Result) (null, if FileBrowser.Success is false)
        Debug.Log( FileBrowser.Success + " " + FileBrowser.Result );

        if ( FileBrowser.Success )
        {
            ModalDialog.Instance.Show( "Processing File",
                "Please wait while your file is encoded into a txn and broadcast" );
            try
            {
                BitIndexUtils.QueryUtxos( Authenticator.Instance.Identity.Address, utxos =>
                {
                    var utxo = utxos.First();
                    Debug.Log( JsonConvert.SerializeObject( utxo ) );

                    UtxoUtils.BuildTxnFromUtxo(
                            Authenticator.Instance.Identity.PrivateKey,
                            utxo.ToUTXO(),
                            OpReturns.MakeBlob( Encoding.UTF8.GetBytes( FileBrowser.Result ) ) )
                        .Spend( txn =>
                        {
                            var value = $"https://bico.media/{txn}";
                            Debug.Log( value );
                            ModalDialog.Instance.Hide();
                            ModalDialog.Instance.Show( "File successfully uploaded",
                                $"Check it out at: {value}", "View Online", "Ok" );
                            ModalDialog.Instance.CallbackYes.AddListener( () =>
                            {
                                
                                Application.OpenURL( value);
                            } );

                            FileUrl.text = value;
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
        else
        {
            ModalDialog.Instance.Show( "File Browser Error", "Could not pinpoint file to upload", "Ok" );
        }
    }

    void OnCameraShotComplete( Texture2D texture2D, string path )
    {
    }
}