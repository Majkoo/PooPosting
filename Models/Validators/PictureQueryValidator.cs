﻿using FluentValidation;

namespace PicturesAPI.Models.Validators;

public class PictureQueryValidator : AbstractValidator<PictureQuery>
{    
    private readonly int[] _allowedPageSizes = { 10, 20, 40, 100 };

    public PictureQueryValidator()
    {
        RuleFor(p => p.PageNumber)
            .GreaterThanOrEqualTo(1);

        RuleFor(p => p.PageSize).Custom((value, context) =>
        {
            if (!_allowedPageSizes.Contains(value))
            {
                context.AddFailure("PageSize", $"PageSize must be in [{string.Join(",", _allowedPageSizes)}]");
            }
        });
    }
}