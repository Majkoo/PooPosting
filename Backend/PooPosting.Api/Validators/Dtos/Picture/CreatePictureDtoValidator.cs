using FluentValidation;
using PooPosting.Application.Models.Dtos.Picture.In;

namespace PooPosting.Api.Validators.Dtos.Picture;

public class CreatePictureDtoValidator : AbstractValidator<CreatePictureDto>
{
    private const int MaxFileSize = 4194304; // 4MB
    private const int MaxTagCount = 4;
    private const int MaxTagLength = 25;

    public CreatePictureDtoValidator()
    {
        RuleFor(p => p.DataUrl)
            .NotEmpty()
            .WithMessage("FileBase64 is required.");

        RuleFor(p => p.DataUrl.Length)
            .GreaterThan(0)
            .WithMessage("Picture size must be larger than 0 bytes.")
            .LessThan(MaxFileSize)
            .WithMessage($"Picture size must be lesser than {MaxFileSize} bytes.");
        
        RuleFor(x => x.Tags)
            .Custom(ValidateTags);
    }
    
    private void ValidateTags(string[]? tags, ValidationContext<CreatePictureDto> context)
    {
        if (tags is null) return;

        if (tags.Length > MaxTagCount)
            context.AddFailure($"Maximum tag count is {MaxTagCount}");

        foreach (var tag in tags)
        {
            if (tag is null) continue;
            if (tag.Length > MaxTagLength)
                context.AddFailure($"Maximum tag length is {MaxTagLength}");
        }
    }
}