namespace PooPosting.Application.Models.Dtos.Auth.Out;

public class AuthSuccessResult
{
    public string AuthToken { get; init; } = null!;
    public string RefreshToken { get; init; } = null!;
    public string Uid { get; init; } = null!;
    public int RoleId { get; init; }
}