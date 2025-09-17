namespace PooPosting.Application.Models.Dtos.Auth.In;

public class RegisterDto
{
    public string Nickname { get; init; } = null!;
    public string Email { get; init; } = null!;
    public string Password { get; init; } = null!;
    public string ConfirmPassword { get; init; } = null!;
    public int RoleId { get; init; } = 1;
}