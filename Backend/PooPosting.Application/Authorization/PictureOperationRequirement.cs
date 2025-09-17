using Microsoft.AspNetCore.Authorization;
using PooPosting.Domain.Enums;

namespace PooPosting.Application.Authorization;

public class PictureOperationRequirement : IAuthorizationRequirement
{
    public ResourceOperation PictureOperation { get; }

    public PictureOperationRequirement(ResourceOperation pictureOperation)
    {
        PictureOperation = pictureOperation;
    }
}