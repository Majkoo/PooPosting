using FluentValidation;
using PooPosting.Application.Models.Dtos.Account.In;

namespace PooPosting.Api.Validators.Dtos.Account;

public class UpdateAccountDescriptionDtoValidator: AbstractValidator<UpdateAccountDescriptionDto>
{
    public UpdateAccountDescriptionDtoValidator()
    {
        RuleFor(d => d.Description)
            .NotEmpty()
            .MaximumLength(500);
    }
}