using UnityEngine;

public class QueryBitIndex : MonoBehaviour
{
    async void Start()
    {
        var response = await TaskWebRequest.Get("https://api.bitindex.network/api/v3/main/tx/883d5c2db21c97a0a99dfb774c1b5d4bc1f30596a6437efe6a8a2c312409868b");
        Debug.Log( response );
    }
}
