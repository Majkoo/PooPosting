namespace PooPosting.Application.Models.Dtos.Account.In;

public class UpdateAccountPasswordDto
{
    public string Password { get; set; } = null!;
    public string ConfirmPassword { get; set; } = null!;
}