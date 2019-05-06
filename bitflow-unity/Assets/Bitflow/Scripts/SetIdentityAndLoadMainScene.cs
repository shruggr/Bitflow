using UnityEngine;
using UnityEngine.SceneManagement;

public class SetIdentityAndLoadMainScene : MonoBehaviour
{
    public void OnClick( int n )
    {
        PlayerPrefs.SetInt( "identity-index", n );
        SceneManager.LoadScene( "Main" );
    }
}