using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.UI;

public class PopulateWithIdentity : MonoBehaviour
{
    [SerializeField] Text Text;

    [UsedImplicitly] void Start()
    {
        Text.text = Authenticator.Instance.Identity.Alias.ToUpper();
    }
}