using Microsoft.AspNetCore.Authorization;
using PooPosting.Domain.Enums;

namespace PooPosting.Application.Authorization;

public class CommentOperationRequirement : IAuthorizationRequirement
{
    public ResourceOperation CommentOperation { get; }

    public CommentOperationRequirement(ResourceOperation commentOperation)
    {
        CommentOperation = commentOperation;
    }
}