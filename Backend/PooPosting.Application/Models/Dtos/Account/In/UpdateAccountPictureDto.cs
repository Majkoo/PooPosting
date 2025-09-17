using Microsoft.AspNetCore.Http;

namespace PooPosting.Application.Models.Dtos.Account.In;

public class UpdateAccountPictureDto
{
    public IFormFile? File { get; init; }
}