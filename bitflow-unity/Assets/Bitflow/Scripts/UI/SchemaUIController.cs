using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

[System.Serializable] public class SubmissionEvent : UnityEvent<Dictionary<string, string>>
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

    [Space( 10 )] [SerializeField] GameObject Panel;
    [SerializeField] GameObject Title;
    [SerializeField] GameObject Description;
    [SerializeField] GameObject Spacer;
    [SerializeField] GameObject Image;
    [SerializeField] GameObject Separator;

    public void AddSummary( List<Field> fields )
    {
        var parent = Instantiate( Panel, Parent ).transform;
        var schemaName = Instantiate( SchemaNameTextPrefab, parent );
        schemaName.GetComponent<Text>().text = "SUMMARY";

        foreach ( var field in fields )
        {
            //Debug.Log( JsonConvert.SerializeObject( field ) );
            var go = Instantiate( Title, parent );
            go.GetComponentInChildren<Text>().text = field.Label;
            go = Instantiate( Description, parent );
            go.GetComponentInChildren<Text>().text = field.Value;
            switch ( (Field.Types.Type)field.Type )
            {
                case Field.Types.Type.Image:
                    go = Instantiate( Image, parent );
                    StartCoroutine( ReplaceSprite( field.Value, go.GetComponent<Image>() ) );
                    break;
                default:
                    break;
            }

            Instantiate( Spacer, parent );
        }

        Instantiate( Separator, Parent );
    }

    IEnumerator ReplaceSprite( string txn, Image img )
    {
        var path = "https://bico.media/" + txn + ".jpg";
        Debug.Log( path );
        var www = new WWW( path );
        yield return www;
        // Create a texture in DXT1 format
        Texture2D texture = new Texture2D( www.texture.width, www.texture.height, TextureFormat.DXT1, false );

        // assign the downloaded image to sprite
        www.LoadImageIntoTexture( texture );
        Rect rec = new Rect( 0, 0, texture.width, texture.height );
        Sprite spriteToUse = Sprite.Create( texture, rec, new Vector2( 0.5f, 0.5f ), 100 );
        img.sprite = spriteToUse;

        www.Dispose();
        www = null;
    }

    public void BuildForm( Stage.Types.Schema schema, UTXO[] utxos )
    {
        var utxoIndex = 0;
        var schemaName = Instantiate( SchemaNameTextPrefab, Parent );
        schemaName.GetComponent<Text>().text = schema.Name.ToUpper();

        foreach ( var field in schema.Fields )
        {
            switch ( field.Type )
            {
                case Field.Types.Type.Text:
                    var text = Instantiate( TextInputFieldPrefab, Parent );
                    text.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add( field.Key, text.GetComponent<ISchemaFieldGetter>() );
                    break;
                case Field.Types.Type.Number:
                    var number = Instantiate( NumberInputFieldPrefab, Parent );
                    number.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add( field.Key, number.GetComponent<ISchemaFieldGetter>() );
                    break;
                case Field.Types.Type.Image:
                    var image = Instantiate( ImageUploadWidgetPrefab, Parent );
                    image.GetComponentsInChildren<Text>()[5].text = field.Label;
                    image.GetComponentInChildren<TakePicture>().UTXO = utxos[utxoIndex];
                    utxoIndex++;
                    FieldGetterMap.Add( field.Key, image.GetComponent<ISchemaFieldGetter>() );
                    break;
                case Field.Types.Type.File:
                    var file = Instantiate( FileUploadWidgetPrefab, Parent );
                    file.GetComponentsInChildren<Text>()[5].text = field.Label;
                    file.GetComponentInChildren<UploadFile>().UTXO = utxos[utxoIndex];
                    utxoIndex++;
                    FieldGetterMap.Add( field.Key, file.GetComponent<ISchemaFieldGetter>() );
                    break;
                case Field.Types.Type.Boolean:
                    var boolean = Instantiate( BoolInputPrefab, Parent );
                    boolean.GetComponentInChildren<Text>().text = field.Label;
                    FieldGetterMap.Add( field.Key, boolean.GetComponent<ISchemaFieldGetter>() );
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
        var submitMap = new Dictionary<string, string>();
        foreach ( var element in FieldGetterMap )
        {
            submitMap.Add( element.Key, element.Value.Get() );
        }

        OnSubmit.Invoke( submitMap );
    }
}