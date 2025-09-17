//
// using Google.Cloud.Vision.V1;
//
// namespace PooPosting.Api.Services.Helpers;
//
// public static class NsfwClassifier
// {
//     public static async Task<SafeSearchAnnotation> ClassifyAsync(byte[] fileBytes, CancellationToken cancellationToken)
//     {
//         var client = await ImageAnnotatorClient.CreateAsync(cancellationToken);
//         var image = Image.FromBytes(fileBytes);
//
//         return await client.DetectSafeSearchAsync(image);
//     }
// }
