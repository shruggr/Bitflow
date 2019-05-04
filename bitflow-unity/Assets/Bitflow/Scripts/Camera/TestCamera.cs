using UnityEngine;

public class TestCamera : MonoBehaviour
{
    void Start()
    {
        TakePicture( 128 );
    }

    void TakePicture( int maxSize )
    {
        if ( NativeCamera.IsCameraBusy() )
        {
            return; // Camera already open
        }

        var permission = NativeCamera.TakePicture( ( path ) =>
        {
            Debug.Log( "Image path: " + path );
            var texture = NativeCamera.LoadImageAtPath( path, maxSize );
            if ( path == null )
            {
                Debug.LogError( "Failed to take picture" );
                return;
            }

            // Create a Texture2D from the captured image
            if ( texture == null )
            {
                Debug.Log( "Couldn't load texture from " + path );
                return;
            }

            // Assign texture to a temporary quad and destroy it after 5 seconds
            var quad = GameObject.CreatePrimitive( PrimitiveType.Quad );
            if ( Camera.main == null )
            {
                Debug.LogError( "Scene has no main camera, can't create quad" );
                return;
            }

            quad.transform.position = Camera.main.transform.position + Camera.main.transform.forward * 2.5f;
            quad.transform.forward = Camera.main.transform.forward;
            quad.transform.localScale = new Vector3( 1f, texture.height / (float)texture.width, 1f );

            var material = quad.GetComponent<Renderer>().material;
            if ( !material.shader.isSupported )
            {
                // happens when Standard shader is not included in the build
                material.shader = Shader.Find( "Legacy Shaders/Diffuse" );
            }

            material.mainTexture = texture;

            Destroy( quad, 5f );

            // If a procedural texture is not destroyed manually, 
            // it will only be freed after a scene change
            Destroy( texture, 5f );
        }, maxSize );

        Debug.Log( "Permission result: " + permission );

        //switch (permission)
        //{
        //    case NativeCamera.Permission.Granted:
        //        Debug.Log("This seems to indicate everything is honky dory");
        //        break;
        //    case NativeCamera.Permission.ShouldAsk:
        //        NativeCamera.RequestPermission();
        //        break;
        //    case NativeCamera.Permission.Denied:
        //        NativeCamera.OpenSettings();
        //        break;
        //    default:
        //        throw new ArgumentOutOfRangeException();
        //}
    }
}