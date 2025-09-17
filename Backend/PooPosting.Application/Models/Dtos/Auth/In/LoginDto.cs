namespace PooPosting.Application.Models.Dtos.Auth.In;

public class LoginDto
{
    public string Nickname { get; init; } = null!;
    public string Password { get; init; } = null!;
}