using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;

public class TestSchema : MonoBehaviour
{
    [SerializeField] SchemaUIController Controller;

    public void Start()
    {
        Controller.Build( new Schema
        {
            Id = "0",
            Name = "Collect Name",
            Fields =
            {
                new Schema.Types.Field
                {
                    Key = "0",
                    Label = "First Name",
                    Type = Schema.Types.Type.Text
                },
                new Schema.Types.Field
                {
                    Key = "1",
                    Label = "Surname",
                    Type = Schema.Types.Type.Text
                },
                new Schema.Types.Field
                {
                    Key = "2",
                    Label = "Age",
                    Type = Schema.Types.Type.Number
                }

            }
        } );
        Controller.OnSubmit.AddListener( BuildAndBroadcastTransaction );
    }

    public void BuildAndBroadcastTransaction(Dictionary<string, object> submitMap)
    {
        Debug.Log( "Submit the map: " + JsonConvert.SerializeObject( submitMap ) );
    }
}
