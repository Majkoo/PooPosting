using FluentValidation;
using PooPosting.Application.Models.Dtos.Auth.In;

namespace PooPosting.Api.Validators.Dtos.Auth;

public class RefreshSessionDtoValidator: AbstractValidator<RefreshSessionDto>
{
    public RefreshSessionDtoValidator()
    {
        RuleFor(x => x.Uid)
            .NotEmpty();

        RuleFor(x => x.RefreshToken)
            .NotEmpty();
    }
}