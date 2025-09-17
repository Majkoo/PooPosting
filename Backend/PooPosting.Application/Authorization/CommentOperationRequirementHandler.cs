using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.Enums;

namespace PooPosting.Application.Authorization;

public class CommentOperationRequirementHandler : AuthorizationHandler<CommentOperationRequirement, Comment>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        CommentOperationRequirement requirement,
        Comment resource)
    {
        if (requirement.CommentOperation == ResourceOperation.Read ||
            requirement.CommentOperation == ResourceOperation.Create)
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