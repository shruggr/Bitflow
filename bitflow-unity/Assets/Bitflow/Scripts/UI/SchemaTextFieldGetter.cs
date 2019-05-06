
using UnityEngine;
using UnityEngine.UI;

public interface ISchemaFieldGetter
{
    string Get();
}

public class SchemaTextFieldGetter : MonoBehaviour, ISchemaFieldGetter
{
    [SerializeField] InputField InputField;

    public string Get()
    {
        return InputField.textComponent.text;
    }
}