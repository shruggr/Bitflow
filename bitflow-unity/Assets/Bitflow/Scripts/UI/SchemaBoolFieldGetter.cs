
using UnityEngine;
using UnityEngine.UI;



public class SchemaBoolFieldGetter : MonoBehaviour, ISchemaFieldGetter
{
    [SerializeField] Toggle Toggle;

    public object Get()
    {
        return Toggle.isOn.ToString();
    }
}