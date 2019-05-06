using System.Collections;
using System.Collections.Generic;
using JetBrains.Annotations;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Assertions;
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
    string payeeAddr;
    long funds;

    public void ShowSchemaController()
    {
        TaskList.gameObject.SetActive( false );
        SchemaController.gameObject.SetActive( true );
    }

    public void AddSummary( List<Field> fields )
    {
        SchemaController.AddSummary( fields );
    }

    public void AddForm( string stateTxn, Stage.Types.Schema schema, List<UTXO> utxos, Stage stage )
    {
        Assert.IsTrue( !string.IsNullOrEmpty( stateTxn ) );

        payeeAddr = stage.Payee;
        funds = stage.Funds;
        Assert.IsTrue( !string.IsNullOrEmpty( payeeAddr ) );

        stateId = stateTxn;

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

        SchemaController.BuildForm( schema, utxos.ToArray() );
        SchemaController.OnSubmit.AddListener( SubmitForm );
    }

    void SubmitForm( Dictionary<string, string> data )
    {
        Debug.Log( JsonConvert.SerializeObject( data ) );
        foreach ( var item in data )
        {
            if ( string.IsNullOrEmpty( item.Value ) )
            {
                ModalDialog.Instance.Show( "Missing Fields",
                    "Please fill in all the fields necessary to complete the task", "Ok" );
                return;
            }
        }

        try
        {
            ModalDialog.Instance.Show( "Submitting task",
                "Please wait while your task txn is being build and broadcast" );

            Assert.IsTrue( !string.IsNullOrEmpty( stateId ) );
            Assert.IsNotNull( submitUTXO );
            UtxoUtils.BuildSubmitTxnFromUtxo( Authenticator.Instance.Identity.PrivateKey, submitUTXO,
                OpReturns.MakeSubmit( stateId, data ), payeeAddr, funds ).Spend( s =>
            {
                ModalDialog.Instance.Show( "Transaction Successful",
                    "You txn was broadcast and this task is completed. " +
                    $"{funds} BSV sat have been delivered to the payee ({payeeAddr}). " +
                    "Txn: " + s, "Ok" );
                ModalDialog.Instance.CallbackYes.RemoveAllListeners();
                ModalDialog.Instance.CallbackYes.AddListener( () =>
                {
                    StartCoroutine( DelayedGoToMenu() );
                } );
            } );
        }
        catch
        {
            ModalDialog.Instance.Show( "Fatal Error", "Please try again", "Ok" );
            ModalDialog.Instance.CallbackYes.AddListener( () => { SceneManager.LoadScene( "Main" ); } );
        }
    }

    public IEnumerator DelayedGoToMenu()
    {
        yield return new WaitForSeconds( 0.25f );
        ModalDialog.Instance.Show("Please Wait", "Waiting for confirmation");
        yield return new WaitForSeconds(5f);
        SceneManager.LoadScene("Main");
    }
}