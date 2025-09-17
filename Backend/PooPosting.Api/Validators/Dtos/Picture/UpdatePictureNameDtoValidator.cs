using FluentValidation;
using PooPosting.Application.Models.Dtos.Picture.In;

namespace PooPosting.Api.Validators.Dtos.Picture;

public class UpdatePictureNameDtoValidator: AbstractValidator<UpdatePictureNameDto>
{
    public UpdatePictureNameDtoValidator()
    {
        RuleFor(n => n.Name)
            .MinimumLength(4)
            .MaximumLength(40);
    }
}