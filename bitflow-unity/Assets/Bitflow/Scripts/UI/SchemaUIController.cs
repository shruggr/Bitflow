using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

[System.Serializable] public class SubmissionEvent : UnityEvent<Dictionary<string, object>>
{
}

public class SchemaUIController : MonoBehaviour
{
    [SerializeField] Transform Parent;

    [Space(10)]
    [SerializeField] GameObject TextInputFieldPrefab;
    [SerializeField] GameObject SchemaNameTextPrefab;
    [SerializeField] GameObject NumberInputFieldPrefab;
    [SerializeField] GameObject ImageUploadWidgetPrefab;
    [SerializeField] GameObject FileUploadWidgetPrefab;

    [SerializeField] GameObject ButtonPrefab;

    public SubmissionEvent OnSubmit;

    Dictionary<string, ISchemaFieldGetter> FieldGetterMap = new Dictionary<string, ISchemaFieldGetter>();

    public void Build( Schema schema )
    {
        // Instanciar tudo
        // No fim de instanciar tudo, o field getter map vai estar populado

        var button = Instantiate( ButtonPrefab, Parent );
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