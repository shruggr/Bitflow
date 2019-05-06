using JetBrains.Annotations;
using UnityEngine;

public delegate void UserAuthenticatedHandler();

public class Authenticator : MonoBehaviour
{
    public static Authenticator Instance;
    public static bool Initialized;
    public Identity Identity => Identities[PlayerPrefs.GetInt( "identity-index" )];

    [SerializeField] Identity[] Identities;

    [UsedImplicitly] void Start()
    {
        Authenticate();
        Instance = this;
    }

    public void Authenticate()
    {
        if ( /*Application.platform == RuntimePlatform.WindowsEditor && */Identity != null && Identity.IsValid )
        {
            OnIdentityLoaded();
        }
        else
        {
            if ( Identity == null )
            {
                Debug.LogError( "Error" );
                //Identity = ScriptableObject.CreateInstance<Identity>();
            }

            if ( !Identity.Exists )
            {
                Debug.Log( "Creating new identity" );
                Identity.Create();
            }

            Identity.Load( OnIdentityLoaded );
        }
    }

    void OnIdentityLoaded()
    {
        Debug.Log( "Authenticated as player with address " + Identity.Address );
        Initialized = true;
    }
}