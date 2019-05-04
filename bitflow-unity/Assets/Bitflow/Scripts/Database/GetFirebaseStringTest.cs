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
        Debug.Log("Firebase initialized");

        var worflowState = new WorkflowState
        {
            Id = "yadadadada",
            State = "same-old-state",
            WorkflowTxn = "AnAwesomeWorkflowTxn",
            Status = WorkflowState.Types.Status.Error,
            Tasks =
            {
                new WorkflowState.Types.Task
                {
                    Step = new Step
                    {
                        FundsRequired = 100000,
                        Name = "someguy",
                        Payee = "someOtherGuy",
                        SchemaTxn = "ComplicatedJsonWithABunchOfStuff",
                        ValidationScriptTxn = ""
                    },
                    Status = WorkflowState.Types.Status.Error,
                    Utxo = new WorkflowState.Types.UTXO
                    {
                        TxId = "myId",
                        Vout = 0,
                        Address = "some guy",
                        Script = "op return stuff",
                        Satoshis = 1131283
                    }
                },
                new WorkflowState.Types.Task
                {
                    Step = new Step
                    {
                        FundsRequired = 100000,
                        Name = "someguy",
                        Payee = "someOtherGuy",
                        SchemaTxn = "ComplicatedJsonWithABunchOfStuff",
                        ValidationScriptTxn = ""
                    },
                    Status = WorkflowState.Types.Status.Error,
                    Utxo = new WorkflowState.Types.UTXO
                    {
                        TxId = "myId",
                        Vout = 0,
                        Address = "some guy",
                        Script = "op return stuff",
                        Satoshis = 1131283
                    }
                },
                new WorkflowState.Types.Task
                {
                    Step = new Step
                    {
                        FundsRequired = 100000,
                        Name = "someguy",
                        Payee = "someOtherGuy",
                        SchemaTxn = "ComplicatedJsonWithABunchOfStuff",
                        ValidationScriptTxn = ""
                    },
                    Status = WorkflowState.Types.Status.Error,
                    Utxo = new WorkflowState.Types.UTXO
                    {
                        TxId = "myId",
                        Vout = 0,
                        Address = "some guy",
                        Script = "op return stuff",
                        Satoshis = 1131283
                    }
                }
            }
        };

        await FirebaseManager.Instance.Ref.Child( "DummyWorkflowState" ).SetRawJsonValueAsync( JsonConvert.SerializeObject( worflowState ) );

        var value = await FirebaseHelper.Get<WorkflowState>( FirebaseManager.Instance.Ref.Child("DummyWorkflowState") );
        Debug.Log( JsonConvert.SerializeObject( value ) );
    }
}