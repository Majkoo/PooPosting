using FluentValidation;
using PooPosting.Application.Models.Dtos.Picture.In;

namespace PooPosting.Api.Validators.Dtos.Picture;

public class UpdatePictureDescriptionDtoValidator: AbstractValidator<UpdatePictureDescriptionDto>
{
    public UpdatePictureDescriptionDtoValidator()
    {
        RuleFor(d => d.Description)
            .MaximumLength(500);
    }
}