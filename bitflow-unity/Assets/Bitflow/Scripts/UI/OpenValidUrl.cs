using System.Collections;
using System.Collections.Generic;
using UnityEditor.Build.Content;
using UnityEngine;
using UnityEngine.UI;

public class OpenValidUrl : MonoBehaviour
{
    [SerializeField] Text ImageUrl;

    public void Click()
    {
        if ( !string.IsNullOrEmpty( ImageUrl.text ) )
        {
            Application.OpenURL(ImageUrl.text);
        }
        else
        {
            ModalDialog.Instance.Show("Invalid URL","Could not display this resource","Ok");
        }
    }
}