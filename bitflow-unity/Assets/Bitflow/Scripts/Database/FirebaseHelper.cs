using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Firebase.Database;
using Newtonsoft.Json;
using UnityEngine;

public class FirebaseHelper : MonoBehaviour
{
    public enum FirebaseEventType
    {
        Added,
        Changed
    }

    public static async Task<T> Get<T>( DatabaseReference db )
    {
        var error = $"Firebase get {typeof(T)} from {db} failed.";
        return await db
            .GetValueAsync().ContinueWith( task =>
            {
                if ( task.IsFaulted )
                {
                    throw new FirebaseDataException( "Task is faulted: " + error );
                }

                if ( !task.IsCompleted )
                {
                    throw new FirebaseDataException( "Uncompleted task: " + error );
                }

                if ( !task.Result.Exists )
                {
                    throw new FirebaseDataException( "Results non existent: " + error );
                }

                try
                {
                    return JsonConvert.DeserializeObject<T>( task.Result.GetRawJsonValue() );
                }
                catch ( Exception e )
                {
                    Debug.Log( task.Result.GetRawJsonValue() );
                    throw new FirebaseDataException( $"Parsing error: {e.GetType()}. {error}" );
                }
            } );
    }

    public static async Task<Dictionary<string, List<State.Types.Task>>> GetTaskList( DatabaseReference db )
    {
        var d = new Dictionary<string, List<State.Types.Task>>();
        try
        {
            var dic = await Get<Dictionary<string, Dictionary<string, State.Types.Task>>>( db );
            foreach ( var stateKeyToStateTasks in dic )
            {
                var stateTasks = new List<State.Types.Task>();
                foreach ( var stateTasksDic in stateKeyToStateTasks.Value )
                {
                    stateTasks.Add( stateTasksDic.Value );
                }

                d.Add( stateKeyToStateTasks.Key, stateTasks );
            }
        }
        catch ( FirebaseDataException e )
        {
            Debug.LogError( $"{e.GetType()}:{e.Message}" );
        }

        return d;
    }

    public static async Task<List<T>> GetList<T>( DatabaseReference db )
    {
        var list = new List<T>();
        try
        {
            var dic = await Get<Dictionary<string, T>>( db );
            foreach ( var entry in dic )
            {
                list.Add( entry.Value );
            }
        }
        catch ( FirebaseDataException e )
        {
        }

        return list;
    }

    public static async Task<T> Listen<T>( DatabaseReference db, string key, FirebaseEventType eventType,
        int timeout = 30000 )
    {
        var result = default( T );

        void handler( object o, ChildChangedEventArgs args )
        {
            if ( args.DatabaseError != null )
            {
                Debug.LogError( args.DatabaseError.Message );
                return;
            }

            if ( key == args.Snapshot.Key )
            {
                switch ( eventType )
                {
                    case FirebaseEventType.Added:
                        db.ChildAdded -= handler;
                        break;
                    case FirebaseEventType.Changed:
                        db.ChildChanged -= handler;
                        break;
                    default:
                        throw new ArgumentOutOfRangeException( nameof(eventType), eventType, null );
                }

                //Debug.Log( args.Snapshot.GetRawJsonValue().Replace("{", Environment.NewLine + "{"));
                result = JsonConvert.DeserializeObject<T>( args.Snapshot.GetRawJsonValue() );
                Debug.Log( JsonConvert.SerializeObject( result, Formatting.Indented ) );
            }
        }

        switch ( eventType )
        {
            case FirebaseEventType.Added:
                db.ChildAdded += handler;
                break;
            case FirebaseEventType.Changed:
                db.ChildChanged += handler;
                break;
            default:
                throw new ArgumentOutOfRangeException( nameof(eventType), eventType, null );
        }

        var elapsed = 0;
        const int increment = 200;
        while ( result == null )
        {
            await Task.Delay( increment );
            elapsed += increment;
            if ( elapsed > timeout )
            {
                Debug.LogError( "Timed out while listening for new battle context" );
                return default( T );
            }
        }

        return result;
    }
}

public class FirebaseDataException : Exception
{
    public FirebaseDataException( string message ) : base( message )
    {
    }
}