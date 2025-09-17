using HashidsNet;
using Microsoft.Extensions.Configuration;
using PooPosting.Application.Models.Configuration;

namespace PooPosting.Application.Services.Helpers;

public static class IdHasher
{
    private static int minHashLength;
    private static string? hashAlphabet;
    private static Hashids pictureHasher = null!;
    private static Hashids accountHasher = null!;
    private static Hashids commentHasher = null!;

    public static void Configure(IConfiguration configuration)
    {
        var hashIdsSettings = new HashIdsSettings();
        configuration.GetSection("HashIdsSettings").Bind(hashIdsSettings);

        minHashLength = hashIdsSettings.MinHashLength;
        hashAlphabet = hashIdsSettings.HashAlphabet;
        pictureHasher = new Hashids(hashIdsSettings.PictureSalt, minHashLength, hashAlphabet);
        accountHasher = new Hashids(hashIdsSettings.AccountSalt, minHashLength, hashAlphabet);
        commentHasher = new Hashids(hashIdsSettings.CommentSalt, minHashLength, hashAlphabet);
    }

    public static string EncodePictureId(int id)
    {
        return pictureHasher.Encode(id);
    }

    public static int DecodePictureId(string hashedId)
    {
        return pictureHasher.DecodeSingle(hashedId);
    }

    public static string EncodeAccountId(int id)
    {
        return accountHasher.Encode(id);
    }

    public static int DecodeAccountId(string hashedId)
    {
        return accountHasher.DecodeSingle(hashedId);
    }

    public static string EncodeCommentId(int id)
    {
        return commentHasher.Encode(id);
    }

    public static int DecodeCommentId(string hashedId)
    {
        return commentHasher.DecodeSingle(hashedId);
    }
}