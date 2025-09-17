#nullable enable
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext;
using PooPosting.Domain.DbContext.Entities;
using PooPosting.Domain.Exceptions;

namespace PooPosting.Application.Services;

public class AccountContextService(
        IHttpContextAccessor httpContextAccessor,
        PictureDbContext dbContext
        )
{
    public ClaimsPrincipal User => httpContextAccessor.HttpContext!.User;

    public string GetEncodedAccountId()
    {
        ValidateJwt();
        return IdHasher.EncodeAccountId(int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value));
    }

    public int GetAccountId()
    {
        ValidateJwt();
        return int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
    }

    public async Task<Account> GetAccountAsync()
    {
        ValidateJwt();
        var id = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
        return await dbContext.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id)  ?? throw new UnauthorizedException("please log in");
    }

    public async Task<Account> GetTrackedAccountAsync()
    {
        ValidateJwt();
        var id = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value);
        return await dbContext.Accounts
            .FirstOrDefaultAsync(a => a.Id == id)  ?? throw new UnauthorizedException("please log in");
    }

    public int? TryGetAccountId()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return idClaim is not null ? int.Parse(idClaim) : null;
    }

    public int GetAccountRole()
    {
        ValidateJwt();
        return int.Parse(User.FindFirst(c => c.Type == ClaimTypes.Role)!.Value);
    }


    private void ValidateJwt()
    {
        var exp = User.FindAll(c => true);
        var role = User
            .FindFirst(c => c.Type == ClaimTypes.Role)?.Value;
        var id = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)!.Value;

        if (
            (id is null) || (role is null) || (exp is null) ||
            (!dbContext.Accounts.Any(a => a.Id == int.Parse(id)))
        )
        {
            throw new UnauthorizedException("please log in");
        }

        if (
            (User.FindFirst(c => c.Type == "exp") is null) ||
            (TimeSpan.FromSeconds(int.Parse(User.FindFirst(c => c.Type == "exp")!.Value)) < TimeSpan.FromMinutes(0))
        )
        {
            throw new UnauthorizedException("jwt token has expired.");
        }

    }
}