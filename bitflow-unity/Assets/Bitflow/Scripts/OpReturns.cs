using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

public static class OpReturns
{
    const string BitcoinSimpleStorageProtocol = "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut";

    public static byte[][] MakeImg(byte[] buffer)
    {
        return new[]
        {
            Encoding.UTF8.GetBytes( BitcoinSimpleStorageProtocol ),
            buffer,
            Encoding.UTF8.GetBytes( "image/png" ),
            Encoding.UTF8.GetBytes( "binary" ),
        };
    }

    public static byte[][] MakeBlob(byte[] buffer)
    {
        return new[]
        {
            Encoding.UTF8.GetBytes( BitcoinSimpleStorageProtocol ),
            buffer,
            Encoding.UTF8.GetBytes( "text" ),
            Encoding.UTF8.GetBytes( "binary" ),
        };
    }
}