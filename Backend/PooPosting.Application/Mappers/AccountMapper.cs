using PooPosting.Application.Models.Dtos.Account.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext.Entities;

namespace PooPosting.Application.Mappers;

public static class AccountMapper
{
    public static IQueryable<AccountDto> ProjectToDto(this IQueryable<Account> queryable) 
        => queryable.Select(a => new AccountDto()
        {
            Id = IdHasher.EncodeAccountId(a.Id),
            Nickname = a.Nickname,
            Email = a.Email,
            ProfilePicUrl = a.ProfilePicUrl,
            RoleId = a.RoleId,
            AccountCreated = a.AccountCreated,
            PictureCount = a.Pictures.Count,
            LikeCount = a.Pictures.Sum(p => p.Likes.Count),
            CommentCount = a.Pictures.Sum(p => p.Comments.Count)
        });


    /// <summary>
    /// Maps an Account entity to AccountDto. Assumes Pictures, Likes, and Comments are already loaded.
    /// Prefer ProjectToDto over MapToDto IQueryable for more efficient data retrieval.
    /// </summary>
    public static AccountDto MapToDto(this Account a)
    {
        return new AccountDto
        {
            Id = IdHasher.EncodeAccountId(a.Id),
            Nickname = a.Nickname,
            Email = a.Email,
            ProfilePicUrl = a.ProfilePicUrl,
            RoleId = a.RoleId,
            AccountCreated = a.AccountCreated,
            PictureCount = a.Pictures.Count,
            LikeCount = a.Pictures.Sum(p => p.Likes.Count),
            CommentCount = a.Pictures.Sum(p => p.Comments.Count)
        };
    }
}