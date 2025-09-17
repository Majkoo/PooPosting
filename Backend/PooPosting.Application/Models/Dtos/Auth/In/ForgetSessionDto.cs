namespace PooPosting.Application.Models.Dtos.Auth.In;

public class ForgetSessionDto
{
    public string RefreshToken { get; init; } = null!;
    public string Uid { get; init; } = null!;
}