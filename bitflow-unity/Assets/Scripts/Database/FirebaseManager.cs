using Firebase;
using Firebase.Database;
using Firebase.Unity.Editor;
using JetBrains.Annotations;
using UnityEngine;

public class FirebaseManager : MonoBehaviour
{
    public static FirebaseManager Instance;
    public DatabaseReference Ref;
    public static bool Initialized;

    [UsedImplicitly]
    void Start()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        //Debug.Log( "CheckAndFixDependenciesAsync", gameObject );

        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWith(task =>
        {
            var dependencyStatus = task.Result;
            if (dependencyStatus == DependencyStatus.Available)
            {
                FirebaseApp.DefaultInstance.SetEditorDatabaseUrl("https://bitflow-a5e50.firebaseio.com/");
                Ref = FirebaseDatabase.DefaultInstance.GetReference("");
                Initialized = true;
            }
            else
            {
                Debug.LogError($"Could not resolve all Firebase dependencies: {dependencyStatus}");
            }
        });
    }
}