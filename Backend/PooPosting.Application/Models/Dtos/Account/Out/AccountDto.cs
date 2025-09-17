namespace PooPosting.Application.Models.Dtos.Account.Out;

public class AccountDto
{
    public string Id { get; init; } = null!;
    public string Nickname { get; init; } = null!;
    public string Email { get; init; } = null!;

    public string? ProfilePicUrl { get; init; }

    public int PictureCount { get; init; }
    public int LikeCount { get; init; }
    public int CommentCount { get; init; }
    
    public int RoleId { get; init; }
    public DateTime AccountCreated { get; init; }
}