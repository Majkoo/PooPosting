using FluentValidation;
using PooPosting.Application.Models.Dtos.Comment.In;

namespace PooPosting.Api.Validators.Dtos.Comment;

public class PostPutCommentDtoValidator: AbstractValidator<PostPutCommentDto>
{
    public PostPutCommentDtoValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty()
            .MaximumLength(1500);
    }
}