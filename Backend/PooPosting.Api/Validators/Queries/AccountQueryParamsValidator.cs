using FluentValidation;
using PooPosting.Application.Models.Queries;

namespace PooPosting.Api.Validators.Queries;

public class AccountQueryParamsValidator: AbstractValidator<AccountQueryParams>
{
    private readonly int[] allowedPageSizes = { 2, 3, 4, 5, 6, 7, 8, 10, 15, 20 };
    private readonly string[] allowedOrderValues = { "asc", "desc" };

    public AccountQueryParamsValidator()
    {
        RuleFor(p => p.OrderBy)
            .NotEqual("id", StringComparer.CurrentCultureIgnoreCase);

        RuleFor(p => p)
            .Custom((value, context) =>
            {
                if (value.OrderBy is null) return;
                
                if (!allowedOrderValues.Contains(value.Direction?.ToLower()))
                {
                    context.AddFailure(
                        "Direction",
                        $"When OrderBy is not null, Direction must be in [{string.Join(",", allowedOrderValues)}]"
                    );
                }
            });
        
        RuleFor(q => q.PageNumber)
            .Must(q => q > 0)
            .WithMessage("PageNumber must be greater than 0");

        RuleFor(q => q.PageSize)
            .Custom((value, context) =>
        {
            if (!allowedPageSizes.Contains(value))
            {
                context.AddFailure("PageSize", $"PageSize must be in [{string.Join(",", allowedPageSizes)}]");
            }
        });
    }
}