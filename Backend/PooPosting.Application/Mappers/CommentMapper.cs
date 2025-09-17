using PooPosting.Application.Models.Dtos.Account.Out;
using PooPosting.Application.Models.Dtos.Comment.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext.Entities;

namespace PooPosting.Application.Mappers;

public static class CommentMapper
{
    public static IQueryable<CommentDto> ProjectToDto(this IQueryable<Comment> queryable) 
        => queryable.Select(c => new CommentDto
        {
            Id = IdHasher.EncodeCommentId(c.Id),
            Text = c.Text,
            CommentAdded = c.CommentAdded,
            PictureId = IdHasher.EncodePictureId(c.PictureId),
            Account = new AccountDto
            {
                Id = IdHasher.EncodeAccountId(c.Account.Id),
                Nickname = c.Account.Nickname,
                Email = c.Account.Email,
                ProfilePicUrl = c.Account.ProfilePicUrl,
                RoleId = c.Account.RoleId,
                AccountCreated = c.Account.AccountCreated,
                PictureCount = c.Account.Pictures.Count,
                LikeCount = c.Account.Pictures.Sum(p => p.Likes.Count),
                CommentCount = c.Account.Pictures.Sum(p => p.Comments.Count)
            }
        });
    
    public static CommentDto MapToDto(this Comment c)
    {
        return new CommentDto
        {
            Id = IdHasher.EncodeCommentId(c.Id),
            Text = c.Text,
            CommentAdded = c.CommentAdded,
            PictureId = IdHasher.EncodePictureId(c.PictureId),
            Account = new AccountDto
            {
                Id = IdHasher.EncodeAccountId(c.Account.Id),
                Nickname = c.Account.Nickname,
                Email = c.Account.Email,
                ProfilePicUrl = c.Account.ProfilePicUrl,
                RoleId = c.Account.RoleId,
                AccountCreated = c.Account.AccountCreated,
                PictureCount = c.Account.Pictures.Count,
                LikeCount = c.Account.Pictures.Sum(p => p.Likes.Count),
                CommentCount = c.Account.Pictures.Sum(p => p.Comments.Count)
            }
        };
    }
}