using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;

public class TestSchema : MonoBehaviour
{
    [SerializeField] SchemaUIController Controller;

    public void Start()
    {
        Controller.Build( new Stage.Types.Schema
        {
            Txid = "0",
            Name = "Collect Name",
            Fields =
            {
                new Field
                {
                    Key = "0",
                    Label = "First Name",
                    Type = Field.Types.Type.Text
                },
                new Field
                {
                    Key = "1",
                    Label = "Surname",
                    Type = Field.Types.Type.Text
                },
                new Field
                {
                    Key = "2",
                    Label = "Age",
                    Type = Field.Types.Type.Number
                },
                new Field
                {
                    Key = "3",
                    Label = "Stuff",
                    Type = Field.Types.Type.Image
                },
                new Field
                {
                    Key = "4",
                    Label = "Stuff2",
                    Type = Field.Types.Type.File
                },
                new Field
                {
                    Key = "5",
                    Label = "Stuff3",
                    Type = Field.Types.Type.Boolean
                }
            }
        }, null );
        Controller.OnSubmit.AddListener( BuildAndBroadcastTransaction );
    }

    public void BuildAndBroadcastTransaction( Dictionary<string, object> submitMap )
    {
        Debug.Log( "Submit the map: " + JsonConvert.SerializeObject( submitMap ) );
    }
}