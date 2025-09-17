using FluentValidation;
using PooPosting.Application.Models.Dtos.Account.In;

namespace PooPosting.Api.Validators.Dtos.Account;

public class UpdateAccountPictureDtoValidator : AbstractValidator<UpdateAccountPictureDto>
{
    private const int MaxFileSize = 4194304;

    public UpdateAccountPictureDtoValidator()
    {
        RuleFor(f => f)
            .NotEmpty()
            .Custom((f, context) =>
            {
                if (f.File is null)
                {
                    context.AddFailure("file should not be null");
                    return;
                }

                if (!f.File.ContentType.StartsWith("image"))
                {
                    context.AddFailure("file content type should start with \"image\"");
                    return;
                }

                if (!(f.File.Length is > 0 and < MaxFileSize))
                {
                    context.AddFailure($"file should be greater than 0 bytes and lesser than {MaxFileSize} bytes");
                }
            });
    }
}