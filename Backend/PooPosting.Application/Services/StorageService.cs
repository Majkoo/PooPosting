using System.Net.Http.Headers;
using PooPosting.Application.Models.Configuration;

namespace PooPosting.Application.Services;

public class StorageService(
    SupabaseConfig supabaseConfig, 
    IHttpClientFactory httpClientFactory
    )
{
    private readonly HttpClient httpClient = httpClientFactory.CreateClient("SupabaseClient");

    public async Task<string> UploadFile(string dataUrl, string filePath)
    {
        try
        {
            var resp = await httpClient.PostAsync($"object/{filePath}", DataUrlToByteArray(dataUrl));
            resp.EnsureSuccessStatusCode();
            return $"{supabaseConfig.Endpoint}/storage/v1/object/public/{filePath}";
        }
        catch (Exception)
        {
            throw new Exception("Could not upload data");
        }
    }

    private static ByteArrayContent DataUrlToByteArray(string dataUrl)
    {
        var parts = dataUrl.Split(',');
        var mimeType = parts[0].Split(':')[1].Split(';')[0];
        var base64String = parts[1];
        var byteArray = Convert.FromBase64String(base64String);
        var byteArrayContent = new ByteArrayContent(byteArray);
        byteArrayContent.Headers.ContentType = new MediaTypeHeaderValue(mimeType);
        return byteArrayContent;
    }

}