namespace PooPosting.Application.Models.Configuration;

public class HashIdsSettings
{
    public int MinHashLength { get; set; }
    public string HashAlphabet { get; set; } = null!;
    public string PictureSalt { get; set; } = null!;
    public string AccountSalt { get; set; } = null!;
    public string CommentSalt { get; set; } = null!;
}