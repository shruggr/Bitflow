using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;
using UnityEngine;

public class TaskListPanel : MonoBehaviour
{
    [SerializeField] Transform EntryParent;
    [SerializeField] GameObject EntryPrefab;

    [UsedImplicitly] void OnEnable()
    {
        // Clean previous entries
        if ( EntryParent.childCount > 0 )
        {
            foreach ( GameObject c in EntryParent )
            {
                Destroy( c );
            }
        }

        ProcessTasks();
    }

    async void ProcessTasks()
    {
        var tasksKeyList = await FirebaseHelper.GetTaskList( FirebaseManager.Instance.Ref.Child( "tasks" )
            .Child( Authenticator.Instance.Identity.Address ) );

        if ( tasksKeyList.Count > 0 )
        {
            Debug.Log( $"Display {tasksKeyList.Count} tasks" );

            foreach ( var stateTxnToTask in tasksKeyList )
            {
                foreach ( var task in stateTxnToTask.Value )
                {
                    var go = Instantiate( EntryPrefab, EntryParent );
                    var entry = go.GetComponent<TaskEntry>();
                    entry.Title.text = $"{task.Stage.Name} - {task.Stage.Funds} BSV sat";
                    entry.Description.text = task.Stage.Schema.Name;
                    entry.OnClick.onClick.AddListener( () =>
                    {
                        UIManager.Instance.ShowSchemaController( stateTxnToTask.Key, task.Stage.Schema,
                            task.Utxos.ToList() );
                    } );
                }
            }
        }
        else
        {
            ModalDialog.Instance.Show( "No tasks",
                $"You don't have any tasks assign to your wallet address:{Authenticator.Instance.Identity.Address}",
                "Ok" );
        }
    }

    async void ProcessWorkflows()
    {
        var workflows = await FirebaseHelper.GetList<Workflow>( FirebaseManager.Instance.Ref.Child( "workflows" ) );
        if ( workflows.Count > 0 )
        {
            Debug.Log( $"Display {workflows.Count} workflows" );
        }
        else
        {
            ModalDialog.Instance.Show( "No workflows",
                "You don't have any workflows, please contact your admin.", "Ok" );
        }
    }
}