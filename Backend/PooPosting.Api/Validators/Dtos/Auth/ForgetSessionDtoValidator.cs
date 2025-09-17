using FluentValidation;
using PooPosting.Application.Models.Dtos.Auth.In;

namespace PooPosting.Api.Validators.Dtos.Auth;

public class ForgetSessionDtoValidator : AbstractValidator<ForgetSessionDto>
{
    public ForgetSessionDtoValidator()
    {
        RuleFor(x => x.Uid)
            .NotEmpty();

        RuleFor(x => x.RefreshToken)
            .NotEmpty();
    }
}