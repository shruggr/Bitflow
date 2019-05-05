using UnityEngine;
using UnityEngine.SceneManagement;
#if PLATFORM_ANDROID
using UnityEngine.Android;

#endif

public class RequestCamera : MonoBehaviour
{
    [SerializeField] GameObject AskForCameraPanel;

    void Start()
    {
#if PLATFORM_ANDROID
        if ( Permission.HasUserAuthorizedPermission( Permission.Camera ) &&
             Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) )
        {
            AskForCameraPanel.SetActive( false );
            SceneManager.LoadScene( "Main" );
        }
        else
        {
            RequestPermission();
        }
#endif
    }

    void Update()
    {
#if PLATFORM_ANDROID
        if ( Permission.HasUserAuthorizedPermission( Permission.Camera ) &&
             Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) )
        {
            AskForCameraPanel.SetActive( false );
            SceneManager.LoadScene( "Main" );
        }
        else
        {
            AskForCameraPanel.SetActive( true );
        }
#endif
    }

    public void RequestPermission()
    {
        Debug.Log("OnRequestPermission");
        if ( !Permission.HasUserAuthorizedPermission( Permission.Camera ) )
        {
            Debug.Log("Does not have camera");
            Permission.RequestUserPermission( Permission.Camera );
        }
        else
        {
            Debug.Log("Has Camera");
        }

        if ( !Permission.HasUserAuthorizedPermission( Permission.ExternalStorageWrite ) )
        {
            Debug.Log("Does not have external storage");
            Permission.RequestUserPermission( Permission.ExternalStorageWrite );
        }
        else
        {
            Debug.Log("Has external storage");
        }
    }

    public void OpenSettings()
    {
        NativeCamera.OpenSettings();
    }
}