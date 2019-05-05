using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.SceneManagement;
#if PLATFORM_ANDROID
using UnityEngine.Android;

#endif

public class RequestCamera : MonoBehaviour
{
    async void Start()
    {
        await Task.Delay( 250 ); // Give time for modals to initialize
#if PLATFORM_ANDROID
        if ( Permission.HasUserAuthorizedPermission( Permission.Camera ) &&
             Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) &&
             Application.platform != RuntimePlatform.WindowsEditor )
        {
            ModalDialog.Instance.Hide();
            SceneManager.LoadScene( "Main" );
        }
        else
        {
            RequestPermission();
        }

        //if (!ModalDialog.Instance.IsVisible())
        //{
        //    ModalDialog.Instance.Show("Requires Permissions",
        //        "This app requires both camera and internal storage permissions", true, false);
        //}
#endif
    }

    void Update()
    {
#if PLATFORM_ANDROID
        if ( Permission.HasUserAuthorizedPermission( Permission.Camera ) &&
             Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) &&
             Application.platform != RuntimePlatform.WindowsEditor )
        {
            ModalDialog.Instance.Hide();
            SceneManager.LoadScene( "Main" );
        }
        else
        {
            if ( !ModalDialog.Instance.IsVisible() )
            {
                Debug.Log( "Showing modal" );
                ModalDialog.Instance.Show( "Requires Permissions",
                    "This app requires both camera and internal storage permissions", "Ok" );
                ModalDialog.Instance.CallbackYes.AddListener( RequestPermission );
            }
        }
#endif
    }

    public void RequestPermission()
    {
        Debug.Log( "OnRequestPermission" );
        if ( !Permission.HasUserAuthorizedPermission( Permission.Camera ) )
        {
            Debug.Log( "Does not have camera" );
            Permission.RequestUserPermission( Permission.Camera );
            Debug.Log( "Showing modal" );

            ModalDialog.Instance.Show( "Requires Permissions",
                "This app requires both camera and internal storage permissions", "Ok" );
            ModalDialog.Instance.CallbackYes.AddListener( RequestPermission );

            return;
        }

        Debug.Log( "Has Camera" );

        if ( !Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) )
        {
            Debug.Log( "Does not have external storage" );
            Permission.RequestUserPermission( Permission.ExternalStorageWrite );

            ModalDialog.Instance.Show( "Requires Permissions",
                "This app requires both camera and internal storage permissions", "Ok" );
            ModalDialog.Instance.CallbackYes.AddListener( RequestPermission );

            return;
        }

        Debug.Log( "Has external storage" );
    }

    public void OpenSettings()
    {
        NativeCamera.OpenSettings();
    }
}