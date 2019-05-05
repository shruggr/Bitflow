using System;
using System.Threading.Tasks;
using BestHTTP;

public static class HTTPTaskRequestHelper
{
    public static async Task<HTTPResponse> Get(string uri)
    {
        var request = new HTTPRequest(new Uri(uri), HTTPMethods.Get);
        request.Send();

        while (request.Response == null)
        {
            await Task.Delay(200);
        }

        return request.Response;
    }
}
