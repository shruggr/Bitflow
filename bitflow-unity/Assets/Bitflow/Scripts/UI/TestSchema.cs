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
                },
                new Schema.Types.Field
                {
                    Key = "3",
                    Label = "Stuff",
                    Type = Schema.Types.Type.Image
                },
                new Schema.Types.Field
                {
                    Key = "4",
                    Label = "Stuff2",
                    Type = Schema.Types.Type.File
                },
                new Schema.Types.Field
                {
                    Key = "5",
                    Label = "Stuff3",
                    Type = Schema.Types.Type.Bool
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
