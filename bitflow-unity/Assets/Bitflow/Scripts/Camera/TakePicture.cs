using System.Text;
using UnityEngine;
using UnityEngine.UI;

public class TakePicture : MonoBehaviour
{
    [SerializeField] Button Button;

    public void Take()
    {
        Button.gameObject.SetActive( false );
        NativeToolkit.OnCameraShotComplete += OnCameraShotComplete;
        NativeToolkit.TakeCameraShot();
    }

    void OnCameraShotComplete( Texture2D texture2D, string path )
    {
        var img = texture2D.Resize( 250, 250 );
        if ( img )
        {
            Debug.Log( "Resize successful" );
        }
        Debug.Log( path );
        Debug.Log( $"width: {texture2D.width}, height: {texture2D.height}" );

        var buffer = texture2D.GetRawTextureData();
        Debug.Log( $"buffer length: {buffer.Length}" );

        var encodedStr = Encoding.UTF8.GetString( buffer, 0, buffer.Length );
    }
}