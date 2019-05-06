
using UnityEngine;
using UnityEngine.UI;



public class SchemaBoolFieldGetter : MonoBehaviour, ISchemaFieldGetter
{
    [SerializeField] Toggle Toggle;

    public string Get()
    {
        return Toggle.isOn.ToString();
    }
}