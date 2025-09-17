using FluentValidation;
using PooPosting.Application.Models.Dtos.Account.In;

namespace PooPosting.Api.Validators.Dtos.Account;

public class UpdateAccountEmailDtoValidator: AbstractValidator<UpdateAccountEmailDto>
{
    public UpdateAccountEmailDtoValidator()
    {
        RuleFor(e => e.Email)
            .NotEmpty()
            .MaximumLength(40)
            .EmailAddress();
    }
}