using Microsoft.AspNetCore.Authorization;
using PooPosting.Domain.Enums;

namespace PooPosting.Application.Authorization;

public class AccountOperationRequirement : IAuthorizationRequirement
{
    public ResourceOperation AccountOperation { get; }

    public AccountOperationRequirement(ResourceOperation accountOperation)
    {
        AccountOperation = accountOperation;
    }
}