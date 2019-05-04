using System.IO;
using System.Net;
using System.Threading.Tasks;

public static class TaskWebRequest
{
    public static async Task<string> Get(string uri)
    {
        var result = "";
        HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(uri);
        using (WebResponse myResponse = myRequest.GetResponse())
        {
            using (StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8))
            {
                result = sr.ReadToEnd();
            }
        }

        return result;
    }
}
