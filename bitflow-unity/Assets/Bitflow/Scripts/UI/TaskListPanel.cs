using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;
using UnityEngine;

public class TaskListPanel : MonoBehaviour
{
    [SerializeField] Transform EntryParent;
    [SerializeField] GameObject OpenEntryPrefab;
    [SerializeField] GameObject CompletedEntryPrefab;

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
        //var t = await FirebaseHelper.Get<State.Types.Task>( FirebaseManager.Instance.Ref.Child( "tasks" )
        //    .Child( Authenticator.Instance.Identity.Address )
        //    .Child( "0da098a081e7b94d6821159098c1c912818e82ee66d5afefc27ce7da69499a18" )
        //    .Child( "691061d64b2d272b17011a58ae8e3020fe276ab843774413893e0abfa3c445a7" ) );
        //Debug.LogError( t.Stage.Name );

        var tasksKeyList = await FirebaseHelper.GetTaskList( FirebaseManager.Instance.Ref.Child( "tasks" )
            .Child( Authenticator.Instance.Identity.Address ) );
        if ( tasksKeyList.Count > 0 )
        {
            Debug.Log( $"Display {tasksKeyList.Count} tasks" );

            foreach ( var stateTxnToTask in tasksKeyList )
            {
                foreach ( var task in stateTxnToTask.Value )
                {
                    var go = Instantiate(
                        task.Status == State.Types.Status.Complete ? CompletedEntryPrefab : OpenEntryPrefab,
                        EntryParent );
                    var entry = go.GetComponent<TaskEntry>();
                    entry.Title.text = $"{task.Stage.Name} - {task.Stage.Funds} BSV sat";
                    
                    entry.Description.text = task.Stage.Schema.Name;
                    if ( task.Status == State.Types.Status.Complete )
                    {
                        entry.Title.text += " - DONE";
                    }
                    else
                    {
                        entry.OnClick.onClick.AddListener( () =>
                        {
                            UIManager.Instance.ShowSchemaController( stateTxnToTask.Key, task.Stage.Schema,
                                task.Utxos.ToList(), task.Stage );
                        } );
                    }
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