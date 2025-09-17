namespace PooPosting.Application.Models.Configuration;

public class AuthenticationSettings
{
    public string JwtKey { get; set; }
    public int JwtExpireDays { get; set; }
    public int RefreshTokenExpireDays { get; set; } = 30;
    public string JwtIssuer { get; set; }
}