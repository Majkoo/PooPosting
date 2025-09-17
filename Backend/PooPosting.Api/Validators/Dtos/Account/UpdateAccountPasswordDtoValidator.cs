using FluentValidation;
using PooPosting.Application.Models.Dtos.Account.In;

namespace PooPosting.Api.Validators.Dtos.Account;

public class UpdateAccountPasswordDtoValidator: AbstractValidator<UpdateAccountPasswordDto>
{
    public UpdateAccountPasswordDtoValidator()
    {
        RuleFor(p => p.Password)
            .NotEmpty()
            .MinimumLength(8);

        RuleFor(p => p.ConfirmPassword)
            .NotEmpty()
            .Equal(e => e.Password)
            .WithMessage("Passwords are not equal");
    }
}