using FluentValidation;
using PooPosting.Application.Models.Dtos.Auth.In;

namespace PooPosting.Api.Validators.Dtos.Auth;

public class LoginDtoValidator : AbstractValidator<LoginDto>
{
    public LoginDtoValidator()
    {
        RuleFor(x => x.Nickname)
            .NotEmpty();

        RuleFor(x => x.Password)
            .NotEmpty();
    }
}