using System.Collections;
using JetBrains.Annotations;
using UnityEngine;

public class EnableSceneGameObjects : MonoBehaviour
{
    [SerializeField] GameObject[] ObjectsToActivate;

    [UsedImplicitly] void Awake()
    {
        foreach ( var go in ObjectsToActivate )
        {
            go.SetActive( false );
        }
    }

    [UsedImplicitly] void Start()
    {
        StartCoroutine( WaitForInitialization() );
    }

    public IEnumerator WaitForInitialization()
    {
        while ( !Authenticator.Initialized || !FirebaseManager.Initialized )
        {
            yield return new WaitForEndOfFrame();
        }

        foreach ( var go in ObjectsToActivate )
        {
            go.SetActive( true );
        }
    }
}