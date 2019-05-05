using System.Threading.Tasks;
using JetBrains.Annotations;
using Newtonsoft.Json;
using UnityEngine;

public class GetFirebaseStringTest : MonoBehaviour
{
    [UsedImplicitly] async void Start()
    {
        while ( !FirebaseManager.Initialized )
        {
            await Task.Delay( 100 );
        }

        Debug.Log( "Firebase initialized" );

        var worflowState = new Workflow
        {
            Txid = "Test"
        };

        await FirebaseManager.Instance.Ref.Child( "DummyWorkflowState" )
            .SetRawJsonValueAsync( JsonConvert.SerializeObject( worflowState ) );

        var value = await FirebaseHelper.Get<Workflow>( FirebaseManager.Instance.Ref.Child( "DummyWorkflowState" ) );
        Debug.Log( JsonConvert.SerializeObject( value ) );
    }
}