using PooPosting.Application.Models.Dtos.Account.Out;
using PooPosting.Application.Models.Dtos.Comment.Out;
using PooPosting.Application.Models.Dtos.Picture.Out;
using PooPosting.Application.Services.Helpers;
using PooPosting.Domain.DbContext.Entities;

namespace PooPosting.Application.Mappers;

public static class PictureMapper
{
    public static IQueryable<PictureDto> ProjectToDto(this IQueryable<Picture> queryable)
    {
        return queryable.Select(p => new PictureDto
        {
            Id = IdHasher.EncodePictureId(p.Id),
            Tags = p.PictureTags.Select(t => t.Tag.Value).ToList(),
            Description = p.Description,
            Account = new AccountDto
            {
                Id = IdHasher.EncodeAccountId(p.Account.Id),
                Nickname = p.Account.Nickname,
                Email = p.Account.Email,
                ProfilePicUrl = p.Account.ProfilePicUrl,
                RoleId = p.Account.RoleId,
                AccountCreated = p.Account.AccountCreated,
                PictureCount = p.Account.Pictures.Count,
                LikeCount = p.Account.Pictures.Sum(pi => pi.Likes.Count),
                CommentCount = p.Account.Pictures.Sum(pi => pi.Comments.Count)
            },
            Comments = p.Comments
                .OrderByDescending(c => c.CommentAdded)
                .Take(3)
                .Select(c => new CommentDto
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
                        LikeCount = c.Account.Pictures.Sum(pi => pi.Likes.Count),
                        CommentCount = c.Account.Pictures.Sum(pi => pi.Comments.Count)
                    }
                }).ToList(),
            Url = p.Url,
            PictureAdded = p.PictureAdded,
            LikeCount = p.Likes.Count, 
            CommentCount = p.Comments.Count, 
            IsLiked = MapperContext.CurrentUserId != null && p.Likes.Any(l => l.AccountId == MapperContext.CurrentUserId)
        });
    }
    
    public static PictureDto MapToDto(this Picture p)
    {
        return new PictureDto
        {
            Id = IdHasher.EncodePictureId(p.Id),
            Tags = p.PictureTags.Select(t => t.Tag.Value).ToList(),
            Description = p.Description,
            Account = p.Account.MapToDto(),
            Comments = p.Comments
                .OrderByDescending(c => c.CommentAdded)
                .Take(3)
                .Select(c => new CommentDto
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
                        LikeCount = c.Account.Pictures.Sum(pi => pi.Likes.Count),
                        CommentCount = c.Account.Pictures.Sum(pi => pi.Comments.Count)
                    }
                })
                .ToList(),
            Url = p.Url,
            PictureAdded = p.PictureAdded,
            LikeCount = p.Likes.Count, 
            CommentCount = p.Comments.Count, 
            IsLiked = MapperContext.CurrentUserId != null && p.Likes.Any(l => l.AccountId == MapperContext.CurrentUserId)
        };
    }
}