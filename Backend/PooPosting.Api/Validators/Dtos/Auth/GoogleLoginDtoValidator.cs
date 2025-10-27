using FluentValidation;
using PooPosting.Application.Models.Dtos.Auth.In;
using PooPosting.Domain.DbContext;

namespace PooPosting.Api.Validators.Dtos.Auth;

public class GoogleLoginDtoValidator : AbstractValidator<GoogleLoginDto>
{
    public GoogleLoginDtoValidator(PictureDbContext dbContext)
    {
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .When(x => !string.IsNullOrEmpty(x.Password) || !string.IsNullOrEmpty(x.ConfirmPassword));

        RuleFor(x => x.ConfirmPassword)
            .Equal(e => e.Password)
            .When(x => !string.IsNullOrEmpty(x.Password) || !string.IsNullOrEmpty(x.ConfirmPassword));

    }
}