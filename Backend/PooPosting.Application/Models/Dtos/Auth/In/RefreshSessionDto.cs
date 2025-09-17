namespace PooPosting.Application.Models.Dtos.Auth.In;

public class RefreshSessionDto
{
    public string RefreshToken { get; init; } = null!;
    public string Uid { get; init; } = null!;
}