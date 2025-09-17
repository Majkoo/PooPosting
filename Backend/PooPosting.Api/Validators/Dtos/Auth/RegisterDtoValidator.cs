using FluentValidation;
using PooPosting.Application.Models.Dtos.Auth.In;
using PooPosting.Domain.DbContext;

namespace PooPosting.Api.Validators.Dtos.Auth;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator(PictureDbContext dbContext)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .MaximumLength(100)
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8);
        
        RuleFor(x => x.ConfirmPassword)
            .Equal(e => e.Password);

        RuleFor(x => x.Nickname)
            .NotEmpty()
            .MinimumLength(4)
            .MaximumLength(25)
            .Custom(
                (value, context) =>
                {
                    var nicknameInUse = dbContext.Accounts.Any(a => a.Nickname == value);
                    if (nicknameInUse)
                    {
                        context.AddFailure("Nickname", "That nickname is taken");
                    }
                });
    }
}