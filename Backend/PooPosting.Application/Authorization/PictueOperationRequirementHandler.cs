using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.Enums;

namespace PooPosting.Application.Authorization;

public class PictureOperationRequirementHandler : AuthorizationHandler<PictureOperationRequirement, Picture>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PictureOperationRequirement requirement,
        Picture resource)
    {
        if (requirement.PictureOperation == ResourceOperation.Read ||
            requirement.PictureOperation == ResourceOperation.Create)
        {
            context.Succeed(requirement);
        }

        var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
        var userRole = context.User.FindFirst(c => c.Type == ClaimTypes.Role)!.Value;
        
        if (resource.Account.Id.ToString() == userId)
        {
            context.Succeed(requirement);
        }
        else if (userRole is "3" or "Administrator")
        {
            context.Succeed(requirement);
        }
        
        return Task.CompletedTask;

    }
}