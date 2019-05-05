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
        var name = Instantiate( SchemaNameTextPrefab, Parent );
        name.GetComponent<Text>().text = schema.Name.ToUpper();

        // Instanciar tudo
        foreach ( var field in schema.Fields )
        {
            switch ( field.Type )
            {
                case Schema.Types.Type.Text:
                    var text = Instantiate(TextInputFieldPrefab, Parent);
                    text.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, text.GetComponent<ISchemaFieldGetter>());
                    break;
                case Schema.Types.Type.Number:
                    var number = Instantiate(NumberInputFieldPrefab, Parent);
                    number.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, number.GetComponent<ISchemaFieldGetter>());
                    break;
                case Schema.Types.Type.Image:
                    var image = Instantiate(ImageUploadWidgetPrefab, Parent);
                    FieldGetterMap.Add(field.Key, image.GetComponent<ISchemaFieldGetter>());
                    break;
                case Schema.Types.Type.File:
                    var file = Instantiate(FileUploadWidgetPrefab, Parent);
                    FieldGetterMap.Add(field.Key, file.GetComponent<ISchemaFieldGetter>());
                    break;
                case Schema.Types.Type.Bool:
                    var bol = Instantiate(FileUploadWidgetPrefab, Parent);
                    bol.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add(field.Key, bol.GetComponent<ISchemaFieldGetter>());
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