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
            .EmailAddress()
            .Custom(
                (value, context) =>
                {
                    var emailInUse = dbContext.Accounts.Any(a => a.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("ConflictError", "That Email is taken");
                    }
                });

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8);

        RuleFor(x => x.ConfirmPassword)
            .Equal(e => e.Password);

        RuleFor(x => x.Nickname)
            .NotEmpty()
            .MinimumLength(4)
            .MaximumLength(25)
            .Matches(@"^[a-zA-Z0-9_.-]*$").WithMessage("Usernames cannot contain special characters")
            .Custom(
                (value, context) =>
                {
                    var nicknameInUse = dbContext.Accounts.Any(a => a.Nickname == value);
                    if (nicknameInUse)
                    {
                        context.AddFailure("ConflictError", "That nickname is taken");
                    }
                });
    }
}