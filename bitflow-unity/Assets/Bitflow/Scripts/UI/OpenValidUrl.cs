﻿using UnityEngine;
using UnityEngine.UI;

public class OpenValidUrl : MonoBehaviour
{
    [SerializeField] Text ImageUrl;

    public void Click()
    {
        if ( !string.IsNullOrEmpty( ImageUrl.text ) )
        {
            Application.OpenURL( $"https://bico.media/{ImageUrl.text}" );
        }
        else
        {
            ModalDialog.Instance.Show( "Invalid URL", "Could not display this resource", "Ok" );
        }
    }
}