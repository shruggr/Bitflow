using System.Collections.Generic;
using System.Net.Mime;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

[System.Serializable] public class SubmissionEvent : UnityEvent<Dictionary<string, object>>
{
}

public class SchemaUIController : MonoBehaviour
{
    [SerializeField] Transform Parent;

    [Space( 10 )] [SerializeField] GameObject TextInputFieldPrefab;
    [SerializeField] GameObject SchemaNameTextPrefab;
    [SerializeField] GameObject NumberInputFieldPrefab;
    [SerializeField] GameObject ImageUploadWidgetPrefab;
    [SerializeField] GameObject FileUploadWidgetPrefab;
    [SerializeField] GameObject BoolInputPrefab;

    [SerializeField] GameObject ButtonPrefab;

    public SubmissionEvent OnSubmit;

    Dictionary<string, ISchemaFieldGetter> FieldGetterMap = new Dictionary<string, ISchemaFieldGetter>();

    public void Build( Schema schema )
    {
        var schemaName = Instantiate( SchemaNameTextPrefab, Parent );
        schemaName.GetComponent<Text>().text = schema.Name.ToUpper();

        foreach ( var field in schema.Fields )
        {
            switch ( field.Type )
            {
                case Field.Types.Type.Text:
                    var text = Instantiate(TextInputFieldPrefab, Parent);
                    text.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, text.GetComponent<ISchemaFieldGetter>());
                    break;
                case Field.Types.Type.Number:
                    var number = Instantiate(NumberInputFieldPrefab, Parent);
                    number.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, number.GetComponent<ISchemaFieldGetter>());
                    break;
                case Field.Types.Type.Image:
                    var image = Instantiate(ImageUploadWidgetPrefab, Parent);
                    image.GetComponentsInChildren<Text>()[5].text = field.Label;
                    FieldGetterMap.Add(field.Key, image.GetComponent<ISchemaFieldGetter>());
                    break;
                case Field.Types.Type.File:
                    var file = Instantiate(FileUploadWidgetPrefab, Parent);
                    file.GetComponentsInChildren<Text>()[5].text = field.Label;
                    FieldGetterMap.Add(field.Key, file.GetComponent<ISchemaFieldGetter>());
                    break;
                case Field.Types.Type.Boolean:
                    var boolean = Instantiate(BoolInputPrefab, Parent);
                    boolean.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, boolean.GetComponent<ISchemaFieldGetter>());
                    break;
            }
            
        }

        var button = Instantiate( ButtonPrefab, Parent );
        button.GetComponentInChildren<Text>().text = "Submit";
        var b = button.GetComponent<Button>();
        b.onClick.AddListener( Submit );
    }

    void Submit()
    {
        var submitMap = new Dictionary<string, object>();
        foreach ( var element in FieldGetterMap )
        {
            submitMap.Add( element.Key, element.Value.Get() );
        }

        OnSubmit.Invoke( submitMap );
    }
}