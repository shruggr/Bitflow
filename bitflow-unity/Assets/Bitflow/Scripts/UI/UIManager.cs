using System.Collections.Generic;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.Assertions;
using UnityEngine.Events;
using UnityEngine.SceneManagement;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance;

    [SerializeField] GameObject TaskList;
    [SerializeField] SchemaUIController SchemaController;

    [UsedImplicitly] void Awake()
    {
        Instance = this;
        Assert.IsNotNull( TaskList );
        Assert.IsNotNull( SchemaController );
    }

    string stateId;
    UTXO submitUTXO;

    public void ShowSchemaController( string stateTxn, Stage.Types.Schema schema, List<UTXO> utxos )
    {
        Assert.IsTrue( !string.IsNullOrEmpty( stateTxn ) );
        stateId = stateTxn;
        TaskList.gameObject.SetActive( false );
        SchemaController.gameObject.SetActive( true );

        foreach ( var utxo in utxos )
        {
            if ( utxo.Satoshis >= 100000 ) // Dont use an utxo meant for an image to submit this
            {
                continue;
            }

            submitUTXO = utxo;
            utxos.Remove( utxo );
            break;
        }

        SchemaController.Build( schema, utxos.ToArray() );
        SchemaController.OnSubmit.AddListener( SubmitForm );
    }

    void SubmitForm( Dictionary<string, object> data )
    {
        ModalDialog.Instance.Show( "Submitting task",
            "Please wait while your task txn is being build and broadcast" );

        Assert.IsTrue( !string.IsNullOrEmpty( stateId ) );
        Assert.IsNotNull( submitUTXO );
        UtxoUtils.BuildTxnFromUtxo( Authenticator.Instance.Identity.PrivateKey, submitUTXO,
            OpReturns.MakeSubmit( stateId, data ) ).Spend( s =>
        {
            ModalDialog.Instance.Show( "Transaction Successful",
                "You txn was broadcast and this task is completed. " +
                "The appropriate funds have been delivered to the payee." +
                "Txn: " + s, "Ok" );
            ModalDialog.Instance.CallbackYes.AddListener( () => { SceneManager.LoadScene( "Main" ); } );
        } );
    }
}