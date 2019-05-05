
using UnityEngine;
using UnityEngine.UI;

public interface ISchemaFieldGetter
{
    object Get();
}

public class SchemaTextFieldGetter : MonoBehaviour, ISchemaFieldGetter
{
    [SerializeField] InputField InputField;

    public object Get()
    {
        return InputField.textComponent.text;
    }
}